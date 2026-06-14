import { useState } from "react";
import BifurcationChart from "../components/charts/BifurcationChart";
import PhaseDiagramChart from "../components/charts/PhaseDiagramChart";
import PageHeader from "../components/layout/PageHeader";
import BifurcationForm from "../components/simulations/BifurcationForm";
import InfectionWastewaterForm from "../components/simulations/InfectionWastewaterForm";
import LyapunovRiskPanel from "../components/simulations/LyapunovRiskPanel";
import NonHomogeneousEventForm from "../components/simulations/NonHomogeneousEventForm";
import PhaseDiagramForm from "../components/simulations/PhaseDiagramForm";
import SimulationResultPanel from "../components/simulations/SimulationResultPanel";
import ViralDecayForm from "../components/simulations/ViralDecayForm";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import type { SimulationResult } from "../types/simulation";

const tabs = [
  { id: "decay", label: "Modelo 1D" },
  { id: "infection", label: "Modelo 2D" },
  { id: "event", label: "Evento no homogéneo" },
  { id: "bifurcation", label: "Bifurcación" },
  { id: "phase", label: "Diagrama de fase" },
  { id: "lyapunov", label: "Región segura" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function SimulationsPage() {
  const [active, setActive] = useState<TabId>("decay");
  const [result, setResult] = useState<SimulationResult | null>(null);

  const title = tabs.find((tab) => tab.id === active)?.label ?? "Simulación";

  return (
    <>
      <PageHeader
        title="Simulaciones"
        description="Ejecutá modelos dinámicos para analizar estabilidad, umbrales epidemiológicos, eventos externos y regiones seguras."
      />
      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button key={tab.id} variant={active === tab.id ? "primary" : "secondary"} onClick={() => setActive(tab.id)}>
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="grid gap-5">
        {active === "decay" && (
          <Card title="Modelo 1D: decaimiento viral">
            <p className="mb-4 text-sm text-slate-600">dV/dt = S - kV - dV. Permite estudiar equilibrio, estabilidad y persistencia de carga viral.</p>
            <ViralDecayForm onResult={setResult} />
          </Card>
        )}
        {active === "infection" && (
          <Card title="Modelo 2D: infectados y carga viral">
            <p className="mb-4 text-sm text-slate-600">Relaciona I(t) con V(t) para comparar crecimiento epidemiológico y señal ambiental.</p>
            <InfectionWastewaterForm onResult={setResult} />
          </Card>
        )}
        {active === "event" && (
          <Card title="Sistema no homogéneo">
            <p className="mb-4 text-sm text-slate-600">Modela shocks de brote, señales sinusoidales o lluvia con dilución temporal.</p>
            <NonHomogeneousEventForm onResult={setResult} />
          </Card>
        )}
        {active === "bifurcation" && (
          <>
            <Card title="Bifurcación">
              <p className="mb-4 text-sm text-slate-600">Explora el umbral beta = gamma donde aparece un equilibrio positivo de infectados.</p>
              <BifurcationForm onResult={setResult} />
            </Card>
            <Card title="Diagrama de bifurcación"><BifurcationChart result={result} /></Card>
          </>
        )}
        {active === "phase" && (
          <>
            <Card title="Diagrama de fase">
              <p className="mb-4 text-sm text-slate-600">Visualiza el campo vectorial en el plano I-V, nulclinas y atractores del sistema.</p>
              <PhaseDiagramForm onResult={setResult} />
            </Card>
            <Card title="Campo vectorial I-V"><PhaseDiagramChart result={result} /></Card>
          </>
        )}
        {active === "lyapunov" && <LyapunovRiskPanel onResult={setResult} />}
        {!["bifurcation", "phase"].includes(active) && <SimulationResultPanel title={`Resultado: ${title}`} result={result} />}
      </div>
    </>
  );
}
