import { apiClient } from "./client";
import type { DatasetSummary } from "../types/common";

export const datasetsApi = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await apiClient.post("/datasets/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
  seedDemo: async () => {
    const { data } = await apiClient.post("/datasets/seed-demo");
    return data;
  },
  summary: async () => {
    const { data } = await apiClient.get<DatasetSummary>("/datasets/summary");
    return data;
  },
};
