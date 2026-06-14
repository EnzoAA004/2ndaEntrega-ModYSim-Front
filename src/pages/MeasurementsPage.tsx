import { useCallback, useEffect, useState } from "react";
import { getApiErrorMessage } from "../api/client";
import { measurementsApi } from "../api/measurementsApi";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import Input from "../components/ui/Input";
import LoadingState from "../components/ui/LoadingState";
import type { Measurement, MeasurementFilters } from "../types/measurement";
import { formatConcentration, formatDate, formatNumber } from "../utils/formatters";

const initialFilters: MeasurementFilters = { location_name: "", city: "", country: "", date_from: "", date_to: "" };

export default function MeasurementsPage() {
  const [rows, setRows] = useState<Measurement[]>([]);
  const [filters, setFilters] = useState<MeasurementFilters>(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (nextFilters: MeasurementFilters) => {
    setLoading(true);
    setError("");
    try {
      const clean = Object.fromEntries(Object.entries(nextFilters).filter(([, value]) => value)) as MeasurementFilters;
      setRows(await measurementsApi.list(clean));
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(initialFilters);
  }, [load]);

  const updateFilter = (key: keyof MeasurementFilters, value: string) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <>
      <PageHeader title="Mediciones" description="Explorá las muestras cargadas, filtrá por ubicación y analizá variables ambientales asociadas." />
      <Card title="Filtros">
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          <Input label="Ubicación" value={filters.location_name} onChange={(e) => updateFilter("location_name", e.target.value)} />
          <Input label="Ciudad" value={filters.city} onChange={(e) => updateFilter("city", e.target.value)} />
          <Input label="País" value={filters.country} onChange={(e) => updateFilter("country", e.target.value)} />
          <Input label="Desde" type="date" value={filters.date_from} onChange={(e) => updateFilter("date_from", e.target.value)} />
          <Input label="Hasta" type="date" value={filters.date_to} onChange={(e) => updateFilter("date_to", e.target.value)} />
        </div>
        <div className="mt-4 flex gap-3">
          <Button onClick={() => void load(filters)}>Aplicar filtros</Button>
          <Button
            variant="secondary"
            onClick={() => {
              setFilters(initialFilters);
              void load(initialFilters);
            }}
          >
            Limpiar
          </Button>
        </div>
      </Card>
      <div className="mt-5">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {!loading && !error && (
          <Card title="Tabla de mediciones">
            {!rows.length ? (
              <EmptyState title="Sin resultados" message="No hay mediciones para los filtros aplicados." />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      {["Fecha", "Ubicación", "Ciudad", "País", "Población", "Caudal", "Carga viral", "Temp.", "Lluvia", "Casos"].map((h) => (
                        <th key={h} className="px-3 py-3 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.map((row, index) => (
                      <tr key={`${row.id}-${index}`}>
                        <td className="px-3 py-3">{formatDate(row.sample_date)}</td>
                        <td className="px-3 py-3 font-medium text-slate-900">{row.location_name ?? "Sin dato"}</td>
                        <td className="px-3 py-3">{row.city ?? "Sin dato"}</td>
                        <td className="px-3 py-3">{row.country ?? "Sin dato"}</td>
                        <td className="px-3 py-3">{formatNumber(row.population_served)}</td>
                        <td className="px-3 py-3">{formatNumber(row.flow_rate_m3_day)} m3/d</td>
                        <td className="px-3 py-3">{formatConcentration(row.viral_concentration_gc_l)}</td>
                        <td className="px-3 py-3">{formatNumber(row.temperature_c, 1)} °C</td>
                        <td className="px-3 py-3">{formatNumber(row.rainfall_mm, 1)} mm</td>
                        <td className="px-3 py-3">{formatNumber(row.clinical_cases)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}
      </div>
    </>
  );
}
