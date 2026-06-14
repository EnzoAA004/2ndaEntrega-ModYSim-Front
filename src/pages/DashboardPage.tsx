import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { analyticsApi } from "../api/analyticsApi";
import { getApiErrorMessage } from "../api/client";
import { measurementsApi } from "../api/measurementsApi";
import EarlyWarningPanel from "../components/dashboard/EarlyWarningPanel";
import LatestMeasurementsTable from "../components/dashboard/LatestMeasurementsTable";
import LocationSelector from "../components/dashboard/LocationSelector";
import RiskTable from "../components/dashboard/RiskTable";
import SummaryCards from "../components/dashboard/SummaryCards";
import ViralLoadChart from "../components/charts/ViralLoadChart";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";
import type { AnalyticsOverview, LocationAnalytics, RiskResult } from "../types/analytics";
import type { Measurement } from "../types/measurement";

export default function DashboardPage() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [riskRows, setRiskRows] = useState<RiskResult[]>([]);
  const [latest, setLatest] = useState<Measurement[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationAnalytics, setLocationAnalytics] = useState<LocationAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [overviewData, riskData, latestData, locationData] = await Promise.all([
          analyticsApi.overview(),
          analyticsApi.riskTable(),
          measurementsApi.latest(),
          measurementsApi.locations(),
        ]);
        setOverview(overviewData);
        setRiskRows(riskData);
        setLatest(latestData);
        setLocations(locationData);
        setSelectedLocation(locationData[0] ?? "");
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  useEffect(() => {
    if (!selectedLocation) return;
    analyticsApi.location(selectedLocation).then(setLocationAnalytics).catch(() => setLocationAnalytics(null));
  }, [selectedLocation]);

  return (
    <>
      <PageHeader
        title="Dashboard epidemiológico"
        description="Monitoreo integrado de carga viral, riesgo por ubicación y alertas tempranas basadas en aguas residuales."
      />
      {loading && <LoadingState />}
      {error && <ErrorState message={`${error}. Verificá que el backend FastAPI esté corriendo en VITE_API_URL.`} />}
      {!loading && !error && (
        <div className="page-grid">
          <SummaryCards overview={overview} />
          {!latest.length && (
            <EmptyState
              title="Todavía no hay datos"
              message="Cargá datos demo o subí un CSV para poblar el dashboard."
              action={<Link className="inline-flex rounded-md bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800" to="/dataset">Ir a Dataset</Link>}
            />
          )}
          <div className="grid gap-5 xl:grid-cols-[1.6fr_0.9fr]">
            <Card
              title="Carga viral y casos clínicos"
              action={
                locations.length ? (
                  <div className="min-w-64">
                    <LocationSelector locations={locations} value={selectedLocation} onChange={setSelectedLocation} />
                  </div>
                ) : undefined
              }
            >
              <ViralLoadChart data={locationAnalytics?.measurements ?? latest} />
            </Card>
            <Card title="Señal de alerta">
              <EarlyWarningPanel warning={locationAnalytics?.early_warning ?? locationAnalytics?.risk} />
            </Card>
          </div>
          <Card title="Riesgo por ubicación">
            <RiskTable rows={riskRows} />
          </Card>
          <Card title="Últimas mediciones">
            <LatestMeasurementsTable rows={latest} />
          </Card>
        </div>
      )}
    </>
  );
}
