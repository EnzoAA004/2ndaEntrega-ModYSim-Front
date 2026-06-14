import { simulationsApi } from "../../api/simulationsApi";
import type { SimulationResult } from "../../types/simulation";
import GenericSimulationForm from "./GenericSimulationForm";

const fields = [
  { name: "I_min", label: "I mínimo" },
  { name: "I_max", label: "I máximo" },
  { name: "V_min", label: "V mínimo" },
  { name: "V_max", label: "V máximo" },
  { name: "grid_size", label: "Tamaño de grilla" },
  { name: "beta", label: "beta" },
  { name: "K", label: "K" },
  { name: "gamma", label: "gamma" },
  { name: "alpha", label: "alpha" },
  { name: "k", label: "k" },
  { name: "d", label: "d" },
];

const defaults = { I_min: 0, I_max: 100000, V_min: 0, V_max: 1500000, grid_size: 20, beta: 0.35, K: 100000, gamma: 0.12, alpha: 25, k: 0.15, d: 0.05 };

export default function PhaseDiagramForm({ onResult }: { onResult: (result: SimulationResult) => void }) {
  return <GenericSimulationForm fields={fields} defaults={defaults} onSubmit={simulationsApi.phaseDiagram} onResult={onResult} />;
}
