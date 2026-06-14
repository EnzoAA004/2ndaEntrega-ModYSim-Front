import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import type { SimulationResult } from "../../types/simulation";
import EmptyState from "../ui/EmptyState";

export default function PhaseDiagramChart({ result }: { result?: SimulationResult | null }) {
  const points = (result?.field ?? result?.points ?? result?.series ?? []) as Array<Record<string, unknown>>;
  if (!Array.isArray(points) || !points.length) {
    return <EmptyState title="Sin diagrama de fase" message="Generá el campo vectorial para visualizar el plano I-V." />;
  }
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="I" name="I(t)" type="number" />
          <YAxis dataKey="V" name="V(t)" type="number" />
          <ZAxis dataKey="magnitude" range={[30, 160]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={points} fill="#0891b2" name="Campo vectorial" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
