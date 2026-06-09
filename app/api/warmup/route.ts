// Lightweight pre-warm for the chat backend. The career MCP runs on Fly with
// scale-to-zero, so the first real question after idle pays a cold-start (machine
// boot). The client pings this on mount; we fire a cheap MCP `initialize` to wake
// the machine while the visitor reads the banner — no Claude call, no token spend.
// Keeps NIMA_MCP_URL server-only.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function warm(): Promise<Response> {
  const url = process.env.NIMA_MCP_URL;
  if (url) {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/event-stream',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'warmup',
          method: 'initialize',
          params: {
            protocolVersion: '2025-06-18',
            capabilities: {},
            clientInfo: { name: 'portfolio-warmup', version: '1' },
          },
        }),
        signal: AbortSignal.timeout(9000),
      });
    } catch {
      // Best-effort — the machine is booting either way.
    }
  }
  return new Response(null, { status: 204 });
}

export const GET = warm;
export const POST = warm;
