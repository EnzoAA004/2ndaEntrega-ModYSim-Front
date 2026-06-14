import type { SimulationResult } from "../../types/simulation";
import { objectToRows } from "../../utils/chartUtils";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";
import SimulationTimeSeriesChart from "../charts/SimulationTimeSeriesChart";

export default function SimulationResultPanel({
  title,
  result,
}: {
  title: string;
  result?: SimulationResult | null;
}) {
  if (!result) return <EmptyState title="Sin resultado" message="Ejecutá el modelo para visualizar la simulación." />;
  const groups = [
    ["Parámetros", result.parameters],
    ["Condiciones iniciales", result.initial_conditions],
    ["Equilibrios", result.equilibria],
    ["Estabilidad", result.stability],
    ["Riesgo", result.risk],
  ] as const;
  return (
    <div className="grid gap-4">
      <Card
        title={title}
        action={result.saved_simulation_id ? <Badge variant="info">ID {String(result.saved_simulation_id)}</Badge> : undefined}
      >
        <SimulationTimeSeriesChart result={result} />
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map(([groupTitle, value]) => {
          const rows = objectToRows(value);
          if (!rows.length) return null;
          return (
            <Card key={groupTitle} title={groupTitle}>
              <dl className="grid gap-2 text-sm">
                {rows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-3 border-b border-slate-100 pb-2">
                    <dt className="font-medium text-slate-600">{row.label}</dt>
                    <dd className="text-right text-slate-900">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          );
        })}
      </div>
      {result.interpretation && (
        <Card title="Interpretación">
          <p className="text-sm leading-6 text-slate-700">{result.interpretation}</p>
        </Card>
      )}
    </div>
  );
}
