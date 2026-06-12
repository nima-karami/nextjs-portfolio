import posthog from 'posthog-js';

import type { GameName } from '../shell/types';

export type CommandCategory =
  | 'info'
  | 'game'
  | 'scene'
  | 'theme'
  | 'system'
  | 'egg';

// Typed map of custom events. One object event per domain; lifecycle/outcome
// lives in a `status` property (not a new event) so the plan stays lean and
// extensible. snake_case property names, `_ms` for durations.
export type AnalyticsEvent = {
  // Every command-bar submission whose first token is (or looks like) a command.
  command: {
    status: 'run' | 'miss';
    command_name: string;
    command_category?: CommandCategory; // only on `run`
    command_args: string[];
  };
  // The conversational layer's lifecycle.
  chat: {
    status: 'sent' | 'completed' | 'failed';
    question_text?: string; // truncated, only on `sent`
    question_chars?: number; // only on `sent`
    response_chars?: number; // only on `completed`
    tool_used?: string | null; // MCP tool, only on `completed`
    duration_ms?: number; // on `completed` / `failed`
    fail_reason?: string; // only on `failed`
  };
  // Arcade games.
  game: {
    status: 'start' | 'over';
    game_name: GameName;
    game_score?: number; // only on `over`
    duration_ms?: number; // only on `over`
  };
  // Visual customization — scenes + themes unified behind `kind`.
  appearance: {
    kind: 'scene' | 'theme';
    value: string;
    via: 'command' | 'cycle';
  };
  // Outbound link clicks.
  link: {
    link_label: string;
    link_href: string;
  };
};

export function captureEvent<K extends keyof AnalyticsEvent>(
  event: K,
  properties: AnalyticsEvent[K]
): void {
  if (!posthog.__loaded) return;
  posthog.capture(event, properties);
}
