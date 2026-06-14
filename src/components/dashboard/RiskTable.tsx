import type { RiskResult } from "../../types/analytics";
import { formatConcentration, formatNumber } from "../../utils/formatters";
import { getRiskBadgeVariant, getRiskLabel } from "../../utils/riskUtils";
import Badge from "../ui/Badge";
import EmptyState from "../ui/EmptyState";

export default function RiskTable({ rows = [] }: { rows?: RiskResult[] }) {
  if (!rows.length) return <EmptyState title="Sin tabla de riesgo" message="Cargá datos demo o conectá el backend." />;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {["Ubicación", "Ciudad", "Carga viral", "Tend. 7d", "Tend. 14d", "Riesgo", "Alerta"].map((header) => (
              <th key={header} className="px-3 py-3 font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, index) => (
            <tr key={`${row.location_name}-${index}`}>
              <td className="px-3 py-3 font-medium text-slate-900">{row.location_name ?? "Sin dato"}</td>
              <td className="px-3 py-3 text-slate-600">{row.city ?? "Sin dato"}</td>
              <td className="px-3 py-3 text-slate-600">{formatConcentration(row.latest_viral_concentration ?? row.viral_concentration_gc_l)}</td>
              <td className="px-3 py-3 text-slate-600">{formatNumber(row.trend_7d, 1)}</td>
              <td className="px-3 py-3 text-slate-600">{formatNumber(row.trend_14d, 1)}</td>
              <td className="px-3 py-3"><Badge variant={getRiskBadgeVariant(row.risk_level)}>{getRiskLabel(row.risk_level)}</Badge></td>
              <td className="px-3 py-3 text-slate-600">{row.early_warning ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
