import { simulationsApi } from "../../api/simulationsApi";
import type { SimulationResult } from "../../types/simulation";
import GenericSimulationForm from "./GenericSimulationForm";

const fields = [
  { name: "beta", label: "beta crecimiento" },
  { name: "K", label: "K capacidad" },
  { name: "gamma", label: "gamma recuperación" },
  { name: "alpha", label: "alpha emisión viral" },
  { name: "k", label: "k decaimiento" },
  { name: "d", label: "d dilución" },
  { name: "I0", label: "I0 infectados iniciales" },
  { name: "V0", label: "V0 carga inicial" },
  { name: "t_final", label: "Tiempo final" },
  { name: "step", label: "Paso" },
  { name: "method", label: "Método", type: "select" as const, options: ["euler", "heun", "rk4"].map((v) => ({ label: v, value: v })) },
];

const defaults = { beta: 0.35, K: 100000, gamma: 0.12, alpha: 25, k: 0.15, d: 0.05, I0: 100, V0: 5000, t_final: 90, step: 0.5, method: "rk4" };

export default function InfectionWastewaterForm({ onResult }: { onResult: (result: SimulationResult) => void }) {
  return <GenericSimulationForm fields={fields} defaults={defaults} onSubmit={simulationsApi.infectionWastewater2d} onResult={onResult} />;
}
