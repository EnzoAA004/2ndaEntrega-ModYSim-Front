import { useEffect, useState } from "react";
import { datasetsApi } from "../api/datasetsApi";
import { getApiErrorMessage } from "../api/client";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ErrorState from "../components/ui/ErrorState";
import Input from "../components/ui/Input";
import LoadingState from "../components/ui/LoadingState";
import type { DatasetSummary } from "../types/common";
import { formatConcentration, formatDate, formatNumber } from "../utils/formatters";

export default function DatasetPage() {
  const [summary, setSummary] = useState<DatasetSummary | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadSummary = async () => {
    try {
      setSummary(await datasetsApi.summary());
    } catch {
      setSummary(null);
    }
  };

  useEffect(() => {
    void loadSummary();
  }, []);

  const runAction = async (action: () => Promise<unknown>, success: string) => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const result = await action();
      setMessage(`${success}: ${JSON.stringify(result)}`);
      await loadSummary();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Dataset" description="Administrá las fuentes de datos: carga CSV, generación demo y resumen del dataset disponible." />
      <div className="grid gap-5 xl:grid-cols-2">
        <Card title="Subir CSV">
          <div className="grid gap-4">
            <Input label="Archivo CSV" type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            <p className="text-sm leading-6 text-slate-600">
              Columnas esperadas: sample_date, location_name, city, country, population_served, flow_rate_m3_day, viral_concentration_gc_l,
              temperature_c, rainfall_mm y clinical_cases.
            </p>
            <Button disabled={!file || loading} onClick={() => file && void runAction(() => datasetsApi.upload(file), "CSV importado")}>Subir CSV</Button>
          </div>
        </Card>
        <Card title="Cargar datos demo">
          <p className="mb-4 text-sm leading-6 text-slate-600">
            Genera mediciones sintéticas útiles para presentar el dashboard, las tendencias y las alertas tempranas.
          </p>
          <Button disabled={loading} onClick={() => void runAction(datasetsApi.seedDemo, "Datos demo cargados")}>Cargar datos demo</Button>
        </Card>
      </div>
      <div className="mt-5 grid gap-5">
        {loading && <LoadingState message="Procesando dataset..." />}
        {error && <ErrorState message={error} />}
        {message && <Card><p className="text-sm text-emerald-700">{message}</p></Card>}
        <Card title="Resumen del dataset">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {[
              ["Total de mediciones", formatNumber(summary?.total_measurements)],
              ["Ubicaciones", formatNumber(summary?.active_locations ?? summary?.locations)],
              ["Desde", formatDate(summary?.date_from)],
              ["Hasta", formatDate(summary?.date_to)],
              ["Promedio viral", formatConcentration(summary?.average_viral_load)],
              ["Máximo viral", formatConcentration(summary?.max_viral_load)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
                <p className="mt-2 font-bold text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
