import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SimulationResult } from "../../types/simulation";
import { simulationToChartData } from "../../utils/chartUtils";
import EmptyState from "../ui/EmptyState";

const palette = ["#0891b2", "#f97316", "#7c3aed", "#16a34a", "#dc2626"];

export default function SimulationTimeSeriesChart({ result }: { result?: SimulationResult | null }) {
  const data = simulationToChartData(result);
  const keys = data.length ? Object.keys(data[0]).filter((key) => key !== "t" && key !== "time") : [];
  if (!data.length || !keys.length) return <EmptyState title="Sin resultado temporal" message="Ejecutá una simulación para ver la trayectoria." />;
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey={Object.prototype.hasOwnProperty.call(data[0], "t") ? "t" : "time"} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          {keys.map((key, index) => (
            <Line key={key} type="monotone" dataKey={key} stroke={palette[index % palette.length]} dot={false} strokeWidth={2} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
