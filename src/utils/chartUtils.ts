import type { Measurement } from "../types/measurement";
import type { SimulationResult } from "../types/simulation";

export const measurementsToChartData = (measurements: Measurement[] = []) =>
  measurements.map((item) => ({
    date: item.sample_date,
    viralLoad: item.viral_concentration_gc_l ?? null,
    movingAverage7d: item.moving_average_7d ?? null,
    clinicalCases: item.clinical_cases ?? null,
    riskScore: item.risk_score ?? null,
  }));

export const simulationToChartData = (result?: SimulationResult | null) => {
  if (!result) return [];
  if (Array.isArray(result.series)) return result.series;
  const time = result.time ?? [];
  const series = result.series ?? {};
  return time.map((t, index) => {
    const row: Record<string, unknown> = { t };
    Object.entries(series).forEach(([key, values]) => {
      row[key] = Array.isArray(values) ? values[index] : values;
    });
    return row;
  });
};

export const objectToRows = (value: unknown): Array<{ label: string; value: string }> => {
  if (!value || typeof value !== "object") return [];
  return Object.entries(value as Record<string, unknown>).map(([label, raw]) => ({
    label,
    value: typeof raw === "object" ? JSON.stringify(raw) : String(raw),
  }));
};
