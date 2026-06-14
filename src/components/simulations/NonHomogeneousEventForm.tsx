import { simulationsApi } from "../../api/simulationsApi";
import type { SimulationResult } from "../../types/simulation";
import GenericSimulationForm from "./GenericSimulationForm";

const fields = [
  { name: "event_type", label: "Tipo de evento", type: "select" as const, options: ["constant", "sinusoidal", "outbreak_shock", "rainfall_dilution"].map((v) => ({ label: v, value: v })) },
  { name: "base_source", label: "Fuente base" },
  { name: "amplitude", label: "Amplitud" },
  { name: "frequency", label: "Frecuencia" },
  { name: "shock_start", label: "Inicio shock" },
  { name: "shock_end", label: "Fin shock" },
  { name: "shock_magnitude", label: "Magnitud shock" },
  { name: "rainfall_start", label: "Inicio lluvia" },
  { name: "rainfall_end", label: "Fin lluvia" },
  { name: "dilution_multiplier", label: "Multiplicador dilución" },
  { name: "k", label: "k decaimiento" },
  { name: "d", label: "d dilución" },
  { name: "V0", label: "V0" },
  { name: "t_final", label: "Tiempo final" },
  { name: "step", label: "Paso" },
  { name: "method", label: "Método", type: "select" as const, options: ["euler", "heun", "rk4"].map((v) => ({ label: v, value: v })) },
];

const defaults = { event_type: "outbreak_shock", base_source: 40000, amplitude: 10000, frequency: 0.15, shock_start: 15, shock_end: 28, shock_magnitude: 90000, rainfall_start: 35, rainfall_end: 42, dilution_multiplier: 0.55, k: 0.15, d: 0.05, V0: 8000, t_final: 75, step: 0.5, method: "rk4" };

export default function NonHomogeneousEventForm({ onResult }: { onResult: (result: SimulationResult) => void }) {
  return <GenericSimulationForm fields={fields} defaults={defaults} onSubmit={simulationsApi.nonHomogeneousEvent} onResult={onResult} />;
}
