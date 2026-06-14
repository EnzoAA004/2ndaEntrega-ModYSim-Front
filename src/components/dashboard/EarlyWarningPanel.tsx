import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { RiskResult } from "../../types/analytics";
import { getRiskDescription, getRiskLabel } from "../../utils/riskUtils";
import Badge from "../ui/Badge";

export default function EarlyWarningPanel({ warning }: { warning?: RiskResult | string | null }) {
  const isString = typeof warning === "string";
  const earlyWarning = !isString && warning?.early_warning;
  const level = !isString ? warning?.risk_level : undefined;
  const message =
    (isString ? warning : warning?.explanation) ??
    (earlyWarning
      ? "La señal viral muestra una alerta temprana que requiere seguimiento."
      : "No se detectan alertas significativas en la serie seleccionada.");
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      {earlyWarning ? <AlertCircle className="h-6 w-6 text-orange-600" /> : <CheckCircle2 className="h-6 w-6 text-emerald-600" />}
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-slate-950">Alerta temprana</h3>
          <Badge variant={earlyWarning ? "orange" : "success"}>{earlyWarning ? "Activa" : "Sin alerta"}</Badge>
          {level && <Badge>{getRiskLabel(level)}</Badge>}
        </div>
        <p className="text-sm leading-6 text-slate-700">{message}</p>
        {level && <p className="mt-2 text-xs text-slate-500">{getRiskDescription(level)}</p>}
      </div>
    </div>
  );
}
