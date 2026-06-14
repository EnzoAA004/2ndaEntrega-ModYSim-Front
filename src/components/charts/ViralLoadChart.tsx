import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Measurement } from "../../types/measurement";
import { measurementsToChartData } from "../../utils/chartUtils";
import EmptyState from "../ui/EmptyState";

export default function ViralLoadChart({ data = [] }: { data?: Measurement[] }) {
  const chartData = measurementsToChartData(data);
  if (!chartData.length) return <EmptyState title="Sin serie temporal" message="Seleccioná una ubicación con mediciones." />;
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="viralLoad" name="Carga viral gc/L" stroke="#0891b2" strokeWidth={2} dot={false} />
          <Line yAxisId="left" type="monotone" dataKey="movingAverage7d" name="Media móvil 7 días" stroke="#14b8a6" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="clinicalCases" name="Casos clínicos" stroke="#f97316" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
