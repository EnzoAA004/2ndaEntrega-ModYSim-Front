import { Code2, Database, GraduationCap, Waves } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";

export default function AboutPage() {
  const features = ["Dashboard de riesgo", "Carga CSV", "Datos demo", "Simulaciones 1D/2D", "Bifurcación", "Diagrama de fase", "Lyapunov"];
  return (
    <>
      <PageHeader
        title="Acerca de Wastewater Sentinel"
        description="Plataforma de modelado y simulación aplicada a vigilancia epidemiológica ambiental."
      />
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Objetivo del proyecto">
          <p className="text-sm leading-6 text-slate-700">
            Wastewater Sentinel integra datos de aguas residuales con modelos dinámicos para anticipar brotes, analizar estabilidad y explorar escenarios de intervención.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {features.map((feature) => <Badge key={feature} variant="info">{feature}</Badge>)}
          </div>
        </Card>
        <Card title="Stack utilizado">
          <div className="grid gap-3 text-sm text-slate-700">
            <p className="flex items-center gap-2"><Code2 className="h-4 w-4 text-cyan-700" /> React, Vite, TypeScript, Tailwind CSS</p>
            <p className="flex items-center gap-2"><Database className="h-4 w-4 text-cyan-700" /> Axios conectado a FastAPI</p>
            <p className="flex items-center gap-2"><Waves className="h-4 w-4 text-cyan-700" /> Recharts y Lucide React</p>
            <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-cyan-700" /> Modelado y Simulación</p>
          </div>
        </Card>
        <Card title="Fuentes de datos posibles">
          <p className="text-sm leading-6 text-slate-700">
            Laboratorios de saneamiento, plantas de tratamiento, redes cloacales municipales, reportes epidemiológicos y datasets públicos de vigilancia ambiental.
          </p>
        </Card>
        <Card title="Integrantes">
          <ul className="grid gap-2 text-sm text-slate-700">
            <li>Integrante 1 - completar</li>
            <li>Integrante 2 - completar</li>
            <li>Integrante 3 - completar</li>
          </ul>
        </Card>
      </div>
    </>
  );
}
