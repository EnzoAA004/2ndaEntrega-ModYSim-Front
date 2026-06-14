export const normalizeRiskLevel = (risk?: string | null) => {
  const value = risk?.toLowerCase() ?? "";
  if (["low", "bajo"].includes(value)) return "low";
  if (["moderate", "medium", "moderado"].includes(value)) return "moderate";
  if (["high", "alto"].includes(value)) return "high";
  if (["critical", "critico", "crítico"].includes(value)) return "critical";
  return "unknown";
};

export const getRiskBadgeVariant = (risk?: string | null) => {
  const normalized = normalizeRiskLevel(risk);
  return {
    low: "success",
    moderate: "warning",
    high: "orange",
    critical: "danger",
    unknown: "neutral",
  }[normalized] as "success" | "warning" | "orange" | "danger" | "neutral";
};

export const getRiskLabel = (risk?: string | null) => {
  const normalized = normalizeRiskLevel(risk);
  return {
    low: "Bajo",
    moderate: "Moderado",
    high: "Alto",
    critical: "Crítico",
    unknown: "Sin dato",
  }[normalized];
};

export const getRiskDescription = (risk?: string | null) => {
  const normalized = normalizeRiskLevel(risk);
  return {
    low: "La señal viral se mantiene dentro de rangos esperados.",
    moderate: "Se observa una señal que requiere seguimiento.",
    high: "La carga viral o la tendencia indican riesgo epidemiológico alto.",
    critical: "Concentración viral elevada con potencial de alerta temprana crítica.",
    unknown: "No hay información suficiente para clasificar el riesgo.",
  }[normalized];
};
