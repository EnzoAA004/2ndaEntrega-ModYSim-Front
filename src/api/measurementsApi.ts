import { apiClient } from "./client";
import type { Measurement, MeasurementFilters } from "../types/measurement";

export const measurementsApi = {
  list: async (filters?: MeasurementFilters) => {
    const { data } = await apiClient.get<Measurement[]>("/measurements", { params: filters });
    return data;
  },
  getById: async (id: string | number) => {
    const { data } = await apiClient.get<Measurement>(`/measurements/${id}`);
    return data;
  },
  locations: async () => {
    const { data } = await apiClient.get<string[]>("/measurements/locations");
    return data;
  },
  latest: async () => {
    const { data } = await apiClient.get<Measurement[]>("/measurements/latest");
    return data;
  },
};
