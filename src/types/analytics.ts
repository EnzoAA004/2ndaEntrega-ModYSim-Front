import type { Measurement } from "./measurement";

export type RiskResult = {
  location_name?: string;
  city?: string;
  country?: string;
  latest_viral_concentration?: number | null;
  viral_concentration_gc_l?: number | null;
  risk_level?: string;
  risk_score?: number | null;
  trend_7d?: number | null;
  trend_14d?: number | null;
  early_warning?: boolean;
  explanation?: string;
  [key: string]: unknown;
};

export type AnalyticsOverview = {
  total_measurements?: number;
  active_locations?: number;
  latest_risk_level?: string;
  highest_risk_location?: string;
  average_viral_load?: number;
  trend_last_14_days?: number;
  trend_last_30_days?: number;
  [key: string]: unknown;
};

export type LocationAnalytics = {
  location_name?: string;
  measurements?: Measurement[];
  risk?: RiskResult;
  risk_trend?: Array<Record<string, unknown>>;
  early_warning?: RiskResult | string;
  [key: string]: unknown;
};
