import posthog from 'posthog-js';

// Typed map of custom events. Add new events here as the site grows.
export type AnalyticsEvent = {
  background_changed: {
    background_id: string;
    background_kind: 'shader' | 'css' | 'other';
    source: 'switcher' | 'shuffle' | 'keyboard';
  };
};

export function captureEvent<K extends keyof AnalyticsEvent>(
  event: K,
  properties: AnalyticsEvent[K]
): void {
  if (!posthog.__loaded) return;
  posthog.capture(event, properties);
}
