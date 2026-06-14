import type { Measurement } from "../../types/measurement";
import { formatConcentration, formatDate, formatNumber } from "../../utils/formatters";
import EmptyState from "../ui/EmptyState";

export default function LatestMeasurementsTable({ rows = [] }: { rows?: Measurement[] }) {
  if (!rows.length) return <EmptyState title="Sin mediciones recientes" message="Todavía no se recibieron muestras." />;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {["Fecha", "Ubicación", "Ciudad", "Carga viral", "Caudal", "Lluvia", "Casos"].map((header) => (
              <th key={header} className="px-3 py-3 font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, index) => (
            <tr key={`${row.id}-${index}`}>
              <td className="px-3 py-3 text-slate-600">{formatDate(row.sample_date)}</td>
              <td className="px-3 py-3 font-medium text-slate-900">{row.location_name ?? "Sin dato"}</td>
              <td className="px-3 py-3 text-slate-600">{row.city ?? "Sin dato"}</td>
              <td className="px-3 py-3 text-slate-600">{formatConcentration(row.viral_concentration_gc_l)}</td>
              <td className="px-3 py-3 text-slate-600">{formatNumber(row.flow_rate_m3_day)} m3/d</td>
              <td className="px-3 py-3 text-slate-600">{formatNumber(row.rainfall_mm, 1)} mm</td>
              <td className="px-3 py-3 text-slate-600">{formatNumber(row.clinical_cases)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
