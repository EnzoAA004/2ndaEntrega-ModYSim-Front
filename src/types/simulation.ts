export type SimulationMethod = "euler" | "heun" | "rk4";

export type SimulationResult = {
  model_type?: string;
  parameters?: Record<string, unknown>;
  initial_conditions?: Record<string, unknown>;
  time?: number[];
  series?: Record<string, number[]> | Array<Record<string, unknown>>;
  equilibria?: unknown;
  stability?: unknown;
  risk?: unknown;
  interpretation?: string;
  saved_simulation_id?: string | number;
  [key: string]: unknown;
};

export type SimulationRecord = SimulationResult & {
  id?: string | number;
  name?: string;
  created_at?: string;
};
