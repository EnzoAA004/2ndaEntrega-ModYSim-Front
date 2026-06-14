import { simulationsApi } from "../../api/simulationsApi";
import type { SimulationResult } from "../../types/simulation";
import GenericSimulationForm from "./GenericSimulationForm";

const fields = [
  { name: "parameter_name", label: "Parámetro", type: "select" as const, options: ["beta", "gamma"].map((v) => ({ label: v, value: v })) },
  { name: "parameter_min", label: "Mínimo" },
  { name: "parameter_max", label: "Máximo" },
  { name: "steps", label: "Pasos" },
  { name: "K", label: "K" },
  { name: "beta", label: "beta" },
  { name: "gamma", label: "gamma" },
];

const defaults = { parameter_name: "beta", parameter_min: 0.01, parameter_max: 0.8, steps: 100, K: 100000, beta: 0.35, gamma: 0.12 };

export default function BifurcationForm({ onResult }: { onResult: (result: SimulationResult) => void }) {
  return <GenericSimulationForm fields={fields} defaults={defaults} onSubmit={simulationsApi.bifurcation} onResult={onResult} />;
}
