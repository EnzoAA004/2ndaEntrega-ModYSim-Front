import { apiClient } from "./client";
import type { AnalyticsOverview, LocationAnalytics, RiskResult } from "../types/analytics";

export const analyticsApi = {
  overview: async () => {
    const { data } = await apiClient.get<AnalyticsOverview>("/analytics/overview");
    return data;
  },
  location: async (locationName: string) => {
    const { data } = await apiClient.get<LocationAnalytics>(
      `/analytics/location/${encodeURIComponent(locationName)}`,
    );
    return data;
  },
  riskTable: async () => {
    const { data } = await apiClient.get<RiskResult[]>("/analytics/risk-table");
    return data;
  },
};
