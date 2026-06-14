export const formatDate = (value?: string | null) => {
  if (!value) return "Sin dato";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" }).format(date);
};

export const formatNumber = (value?: number | null, digits = 0) =>
  value === null || value === undefined || Number.isNaN(value)
    ? "Sin dato"
    : new Intl.NumberFormat("es-AR", { maximumFractionDigits: digits }).format(value);

export const formatConcentration = (value?: number | null) =>
  value === null || value === undefined ? "Sin dato" : `${formatNumber(value, 0)} gc/L`;

export const formatPercent = (value?: number | null) =>
  value === null || value === undefined ? "Sin dato" : `${formatNumber(value, 1)}%`;

export const formatScientific = (value?: number | null) =>
  value === null || value === undefined ? "Sin dato" : value.toExponential(2);

export const formatRiskLevel = (value?: string | null) => {
  const normalized = value?.toLowerCase();
  if (!normalized) return "Sin dato";
  const labels: Record<string, string> = {
    low: "Bajo",
    moderate: "Moderado",
    medium: "Moderado",
    high: "Alto",
    critical: "Crítico",
  };
  return labels[normalized] ?? value;
};
