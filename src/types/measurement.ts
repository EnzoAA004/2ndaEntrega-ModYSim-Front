export type Measurement = {
  id?: number | string;
  sample_date?: string;
  location_name?: string;
  city?: string;
  country?: string;
  latitude?: number | null;
  longitude?: number | null;
  population_served?: number | null;
  flow_rate_m3_day?: number | null;
  viral_concentration_gc_l?: number | null;
  temperature_c?: number | null;
  rainfall_mm?: number | null;
  ph?: number | null;
  turbidity_ntu?: number | null;
  clinical_cases?: number | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
  moving_average_7d?: number | null;
  risk_score?: number | null;
  [key: string]: unknown;
};

export type MeasurementFilters = {
  location_name?: string;
  city?: string;
  country?: string;
  date_from?: string;
  date_to?: string;
};
