import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import type { SimulationResult } from "../../types/simulation";
import EmptyState from "../ui/EmptyState";

export default function BifurcationChart({ result }: { result?: SimulationResult | null }) {
  const raw = (result?.points ?? result?.series ?? []) as Array<Record<string, unknown>>;
  const data = Array.isArray(raw) ? raw : [];
  if (!data.length) return <EmptyState title="Sin bifurcación" message="Ejecutá el barrido de parámetro." />;
  const stable = data.filter((p) => p.stable === true || p.stability === "stable");
  const unstable = data.filter((p) => p.stable === false || p.stability === "unstable");
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="parameter" name="Parámetro" type="number" />
          <YAxis dataKey="equilibrium" name="Equilibrio" type="number" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter name="Estable" data={stable.length ? stable : data} fill="#059669" />
          <Scatter name="Inestable" data={unstable} fill="#dc2626" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
