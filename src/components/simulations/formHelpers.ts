export type FieldConfig = {
  name: string;
  label: string;
  type?: "number" | "text" | "select";
  helperText?: string;
  options?: Array<{ label: string; value: string }>;
};

export const numberFromForm = (value: FormDataEntryValue | null) => Number(value ?? 0);

export const validateCommon = (payload: Record<string, unknown>) => {
  const errors: Record<string, string> = {};
  const nonNegative = ["beta", "gamma", "k", "d", "V0", "I0", "S", "alpha", "base_source"];
  nonNegative.forEach((key) => {
    if (payload[key] !== undefined && Number(payload[key]) < 0) errors[key] = "Debe ser mayor o igual a 0.";
  });
  if (payload.t_final !== undefined && Number(payload.t_final) <= 0) errors.t_final = "Debe ser mayor a 0.";
  if (payload.step !== undefined && Number(payload.step) <= 0) errors.step = "Debe ser mayor a 0.";
  if (payload.K !== undefined && Number(payload.K) <= 0) errors.K = "Debe ser mayor a 0.";
  if (
    payload.parameter_min !== undefined &&
    payload.parameter_max !== undefined &&
    Number(payload.parameter_max) <= Number(payload.parameter_min)
  ) {
    errors.parameter_max = "Debe ser mayor que el mínimo.";
  }
  if (payload.grid_size !== undefined && (Number(payload.grid_size) < 5 || Number(payload.grid_size) > 80)) {
    errors.grid_size = "Usá un valor entre 5 y 80.";
  }
  return errors;
};
