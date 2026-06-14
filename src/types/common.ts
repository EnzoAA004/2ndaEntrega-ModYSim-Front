export type RiskLevel = "low" | "moderate" | "high" | "critical" | string;

export type ApiErrorShape = {
  message?: string;
  detail?: string;
};

export type Option = {
  label: string;
  value: string;
};

export type DatasetSummary = {
  total_measurements?: number;
  active_locations?: number;
  locations?: number;
  date_from?: string;
  date_to?: string;
  average_viral_load?: number;
  max_viral_load?: number;
  [key: string]: unknown;
};
