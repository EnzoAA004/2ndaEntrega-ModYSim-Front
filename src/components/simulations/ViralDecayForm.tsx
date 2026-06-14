import { simulationsApi } from "../../api/simulationsApi";
import type { SimulationResult } from "../../types/simulation";
import GenericSimulationForm from "./GenericSimulationForm";

const fields = [
  { name: "name", label: "Nombre", type: "text" as const },
  { name: "S", label: "S aporte viral", helperText: "Fuente constante de carga viral." },
  { name: "k", label: "k decaimiento" },
  { name: "d", label: "d dilución/remoción" },
  { name: "V0", label: "V0 carga inicial" },
  { name: "t_final", label: "Tiempo final" },
  { name: "step", label: "Paso" },
  { name: "method", label: "Método", type: "select" as const, options: ["euler", "heun", "rk4"].map((v) => ({ label: v, value: v })) },
];

const defaults = { name: "", S: 50000, k: 0.15, d: 0.05, V0: 10000, t_final: 60, step: 0.5, method: "rk4" };

export default function ViralDecayForm({ onResult }: { onResult: (result: SimulationResult) => void }) {
  return <GenericSimulationForm fields={fields} defaults={defaults} onSubmit={simulationsApi.viralDecay1d} onResult={onResult} />;
}
