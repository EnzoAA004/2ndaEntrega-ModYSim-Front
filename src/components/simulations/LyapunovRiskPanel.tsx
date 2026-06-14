import { simulationsApi } from "../../api/simulationsApi";
import type { SimulationResult } from "../../types/simulation";
import Card from "../ui/Card";
import GenericSimulationForm from "./GenericSimulationForm";

const fields = [
  { name: "I_safe", label: "I seguro" },
  { name: "V_safe", label: "V seguro" },
  { name: "a", label: "Peso a" },
  { name: "b", label: "Peso b" },
  { name: "I0", label: "I0" },
  { name: "V0", label: "V0" },
  { name: "t_final", label: "Tiempo final" },
  { name: "step", label: "Paso" },
];

const defaults = { I_safe: 1000, V_safe: 100000, a: 1, b: 0.00001, I0: 1200, V0: 150000, t_final: 60, step: 0.5 };

export default function LyapunovRiskPanel({ onResult }: { onResult: (result: SimulationResult) => void }) {
  return (
    <div className="grid gap-4">
      <Card title="Región segura / Lyapunov">
        <p className="mb-4 text-sm leading-6 text-slate-700">
          La función V_risk(I,V) = a max(0, I - I_safe)^2 + b max(0, V - V_safe)^2 penaliza las trayectorias que salen de la zona operativa segura.
        </p>
        <GenericSimulationForm fields={fields} defaults={defaults} onSubmit={simulationsApi.lyapunovRisk} onResult={onResult} />
      </Card>
    </div>
  );
}
