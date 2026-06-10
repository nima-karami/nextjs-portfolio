// A tiny per-stream external store for one assistant turn. The terminal appends
// a single <StreamLine store={store}/> to scrollback; tokens then flow into the
// store and only that line re-renders (via useSyncExternalStore) — no React
// re-render of the whole buffer per token, and no ref writes during render
// (React Compiler safe).

export type StreamStatus = 'streaming' | 'done' | 'error';

export type StreamState = {
  text: string;
  tool: string | null;
  status: StreamStatus;
};

export type StreamStore = {
  subscribe: (cb: () => void) => () => void;
  getSnapshot: () => StreamState;
  pushToken: (t: string) => void;
  setTool: (name: string) => void;
  finalize: () => void;
  fail: (message?: string) => void;
  /** Resolves when the turn settles (done or error) — lets the caller clear "busy". */
  done: Promise<void>;
};

const FALLBACK =
  'Hmm, something went sideways on my end. Mind trying again? Or grab the curated version with `/resume`.';

export function createStreamStore(): StreamStore {
  let state: StreamState = { text: '', tool: null, status: 'streaming' };
  const listeners = new Set<() => void>();
  let settle!: () => void;
  const done = new Promise<void>((resolve) => {
    settle = resolve;
  });

  const emit = () => listeners.forEach((l) => l());
  const set = (next: Partial<StreamState>) => {
    state = { ...state, ...next };
    emit();
  };

  return {
    subscribe(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getSnapshot() {
      return state;
    },
    pushToken(t) {
      if (state.status !== 'streaming') return;
      set({ text: state.text + t, tool: null });
    },
    setTool(name) {
      if (state.status !== 'streaming') return;
      set({ tool: name });
    },
    finalize() {
      if (state.status !== 'streaming') return;
      set({ status: 'done', tool: null });
      settle();
    },
    fail(message) {
      if (state.status !== 'streaming') return;
      // Keep any text already streamed; otherwise show the fallback.
      set({ status: 'error', tool: null, text: state.text || message || FALLBACK });
      settle();
    },
    done,
  };
}
