import posthog from 'posthog-js';

// Typed map of custom events. Add new events here as the site grows.
export type AnalyticsEvent = {
  // Fired whenever a visitor runs a terminal command.
  command_run: {
    command: string;
    args: string[];
  };
};

export function captureEvent<K extends keyof AnalyticsEvent>(
  event: K,
  properties: AnalyticsEvent[K]
): void {
  if (!posthog.__loaded) return;
  posthog.capture(event, properties);
}
