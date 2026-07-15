type PerformanceMetric = {
  name: string;
  id?: string;
  value: number;
  delta?: number;
  rating?: "good" | "needs-improvement" | "poor";
  navigationType?: string;
};

type WebVitalsSink = (metric: PerformanceMetric) => void;

declare global {
  interface Window {
    __ESGC_WEB_VITALS__?: WebVitalsSink;
  }
}

const sanitizeMetric = (metric: PerformanceMetric) => ({
  name: metric.name,
  id: metric.id,
  value: metric.value,
  delta: metric.delta,
  rating: metric.rating,
  navigationType: metric.navigationType,
});

export const reportPerformanceMetric = (metric: PerformanceMetric) => {
  const sanitizedMetric = sanitizeMetric(metric);

  if (import.meta.env.DEV) {
    console.info("[web-vitals]", sanitizedMetric);
  }

  window.__ESGC_WEB_VITALS__?.(sanitizedMetric);
};

export type { PerformanceMetric };
