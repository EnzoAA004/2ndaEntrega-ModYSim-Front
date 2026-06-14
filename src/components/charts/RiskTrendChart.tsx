import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import EmptyState from "../ui/EmptyState";

export default function RiskTrendChart({ data = [] }: { data?: Array<Record<string, unknown>> }) {
  if (!data.length) return <EmptyState title="Sin tendencia de riesgo" message="No hay serie de riesgo disponible." />;
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="risk_score" name="Score de riesgo" stroke="#dc2626" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
