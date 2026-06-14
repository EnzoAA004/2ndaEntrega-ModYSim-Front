import { Activity, AlertTriangle, MapPin, TrendingUp, Waves } from "lucide-react";
import type { AnalyticsOverview } from "../../types/analytics";
import { formatNumber, formatRiskLevel } from "../../utils/formatters";
import Card from "../ui/Card";

export default function SummaryCards({ overview }: { overview?: AnalyticsOverview | null }) {
  const items = [
    { label: "Total de mediciones", value: formatNumber(overview?.total_measurements), icon: Activity },
    { label: "Ubicaciones activas", value: formatNumber(overview?.active_locations), icon: MapPin },
    { label: "Último nivel de riesgo", value: formatRiskLevel(overview?.latest_risk_level), icon: AlertTriangle },
    { label: "Mayor riesgo", value: overview?.highest_risk_location ?? "Sin dato", icon: Waves },
    { label: "Tendencia 14 días", value: formatNumber(overview?.trend_last_14_days, 1), icon: TrendingUp },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {items.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
              <p className="mt-2 text-xl font-bold text-slate-950">{value}</p>
            </div>
            <div className="rounded-md bg-cyan-50 p-2 text-cyan-700">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
