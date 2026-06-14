import { apiClient } from "./client";
import type { SimulationRecord, SimulationResult } from "../types/simulation";

const postSimulation = async (url: string, payload: Record<string, unknown>) => {
  const { data } = await apiClient.post<SimulationResult>(url, payload);
  return data;
};

export const simulationsApi = {
  viralDecay1d: (payload: Record<string, unknown>) =>
    postSimulation("/simulations/viral-decay-1d", payload),
  infectionWastewater2d: (payload: Record<string, unknown>) =>
    postSimulation("/simulations/infection-wastewater-2d", payload),
  nonHomogeneousEvent: (payload: Record<string, unknown>) =>
    postSimulation("/simulations/non-homogeneous-event", payload),
  bifurcation: (payload: Record<string, unknown>) =>
    postSimulation("/simulations/bifurcation", payload),
  phaseDiagram: (payload: Record<string, unknown>) =>
    postSimulation("/simulations/phase-diagram", payload),
  lyapunovRisk: (payload: Record<string, unknown>) =>
    postSimulation("/simulations/lyapunov-risk", payload),
  list: async () => {
    const { data } = await apiClient.get<SimulationRecord[]>("/simulations");
    return data;
  },
  getById: async (id: string | number) => {
    const { data } = await apiClient.get<SimulationRecord>(`/simulations/${id}`);
    return data;
  },
  remove: async (id: string | number) => {
    const { data } = await apiClient.delete(`/simulations/${id}`);
    return data;
  },
};
