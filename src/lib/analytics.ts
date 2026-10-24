export type AnalyticsEvent =
  | 'cta_hero_click'
  | 'cta_booking_click'
  | 'workflow_tab_switch'
  | 'capacity_model_change'
  | 'chat_widget_open'
  | 'chat_message_sent'
  | 'legal_dialog_open';

export function trackEvent(
  event: AnalyticsEvent,
  metadata?: Record<string, unknown>
): void {
  try {
    if (typeof window !== 'undefined' && 'va' in window && typeof (window as unknown as { va: (e: string, d?: unknown) => void }).va === 'function') {
      (window as unknown as { va: (e: string, d?: unknown) => void }).va(event, metadata);
    }
  } catch {
    // Silent fallback if analytics provider not loaded
  }
}
