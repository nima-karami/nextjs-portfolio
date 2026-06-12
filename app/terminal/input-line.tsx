'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { useShell } from '../shell/shell-context';
import { registry } from './commands';
import Prompt from './prompt';

type InputLineProps = {
  onRun: (input: string) => void;
  history: string[];
  busy: boolean;
};

export default function InputLine({ onRun, history, busy }: InputLineProps) {
  const [value, setValue] = useState('');
  const [histIndex, setHistIndex] = useState<number | null>(null);
  // Slash-palette state: which row is highlighted, and whether the user dismissed
  // the menu with Esc (re-opens on the next keystroke that edits the value).
  const [menuIndex, setMenuIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playSound } = useShell();

  // A finished chat turn re-enables the input; restore focus so typing continues.
  useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy]);

  // The `/` command palette: when the input is a leading slash and the user is
  // still on the command word (no space yet), show every matching command — like
  // Claude Code. A bare `/` lists them all.
  const afterSlash = value.startsWith('/') ? value.slice(1) : null;
  const menuActive =
    afterSlash !== null && !afterSlash.includes(' ') && !dismissed && !busy;
  const prefix = (afterSlash ?? '').toLowerCase();
  const menuItems = menuActive
    ? Object.values(registry).filter(
        (c) => !c.hidden && c.name.startsWith(prefix)
      )
    : [];
  const menuOpen = menuItems.length > 0;
  const sel = menuOpen ? Math.min(menuIndex, menuItems.length - 1) : 0;

  const runItem = (name: string) => {
    onRun('/' + name);
    setValue('');
    setHistIndex(null);
    setDismissed(false);
    setMenuIndex(0);
  };

  const completeItem = (name: string) => {
    setValue('/' + name + ' ');
    setMenuIndex(0);
    inputRef.current?.focus();
  };

  // While the palette is open it owns the arrows/Enter/Tab/Esc. Returns true if
  // the key was consumed (so onKeyDown stops).
  const handlePaletteKey = (e: KeyboardEvent<HTMLInputElement>): boolean => {
    if (!menuOpen) return false;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setMenuIndex(Math.min(sel + 1, menuItems.length - 1));
        return true;
      case 'ArrowUp':
        e.preventDefault();
        setMenuIndex(Math.max(sel - 1, 0));
        return true;
      case 'Enter':
        e.preventDefault();
        runItem(menuItems[sel].name);
        return true;
      case 'Tab':
        e.preventDefault();
        completeItem(menuItems[sel].name);
        return true;
      case 'Escape':
        e.preventDefault();
        setDismissed(true);
        return true;
      default:
        return false;
    }
  };

  // ↑/↓ recall through history when the palette is closed. Returns true if consumed.
  const handleHistoryKey = (e: KeyboardEvent<HTMLInputElement>): boolean => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return true;
      const idx =
        histIndex === null ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(idx);
      setValue(history[idx]);
      return true;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex === null) return true;
      const idx = histIndex + 1;
      if (idx >= history.length) {
        setHistIndex(null);
        setValue('');
      } else {
        setHistIndex(idx);
        setValue(history[idx]);
      }
      return true;
    }
    return false;
  };

  // Tab-completion of a command name, with or without a leading slash.
  const completeCommand = () => {
    const raw = value.trim();
    if (!raw) return;
    const slash = raw.startsWith('/');
    const word = (slash ? raw.slice(1) : raw).toLowerCase();
    if (!word) return;
    const matches = Object.keys(registry).filter((n) => n.startsWith(word));
    if (matches.length === 1) setValue((slash ? '/' : '') + matches[0] + ' ');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // subtle typing click (only audible when `sound on`)
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) playSound('key');

    if (handlePaletteKey(e)) return;
    if (handleHistoryKey(e)) return;

    if (e.key === 'Enter') {
      onRun(value);
      setValue('');
      setHistIndex(null);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      completeCommand();
      return;
    }

    if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      onRun('clear');
      setValue('');
      return;
    }

    if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      setValue('');
      setHistIndex(null);
      setDismissed(false);
    }
  };

  return (
    <div className="relative">
      {menuOpen && (
        <ul className="border-term-dim bg-term-bg absolute top-full left-0 mt-1 max-h-64 w-full max-w-md overflow-auto border py-0.5 shadow-lg">
          {menuItems.map((c, i) => (
            <li
              key={c.name}
              // mousedown (not click) so the input doesn't blur first; prevent
              // default keeps focus on the input after selection.
              onMouseDown={(e) => {
                e.preventDefault();
                runItem(c.name);
              }}
              onMouseEnter={() => setMenuIndex(i)}
              className={`flex cursor-pointer gap-3 px-2 py-0.5 ${
                i === sel ? 'bg-term-selection' : ''
              }`}
            >
              <span className="text-term-accent w-28 shrink-0">/{c.name}</span>
              <span className="text-term-dim truncate">{c.description}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-2">
        <Prompt />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setMenuIndex(0);
            setDismissed(false);
          }}
          onKeyDown={onKeyDown}
          disabled={busy}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="terminal input"
          className="text-term-fg caret-term-accent flex-1 bg-transparent outline-none disabled:opacity-60"
        />
      </div>
    </div>
  );
}
