import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";

const sections = [
  {
    title: "¿Qué es la vigilancia epidemiológica por aguas residuales?",
    body: "Permite observar señales de circulación viral en una población servida por una red cloacal, incluso antes de que todos los casos lleguen al sistema clínico. Es una herramienta ambiental de alerta temprana.",
  },
  {
    title: "¿Qué modela Wastewater Sentinel?",
    body: "I(t) representa infectados estimados, V(t) concentración viral, S(t) aporte viral, k decaimiento, d dilución/remoción, beta crecimiento del brote y gamma recuperación o retiro.",
  },
  {
    title: "Modelo 1D",
    body: "dV/dt = S - kV - dV. El equilibrio V* = S / (k+d) es estable si k+d > 0, porque la carga viral tiende a ese valor ante perturbaciones pequeñas.",
  },
  {
    title: "Modelo 2D",
    body: "dI/dt = beta I(1 - I/K) - gamma I y dV/dt = alpha I - kV - dV. Este sistema vincula la dinámica de infectados con la señal ambiental medida en aguas residuales.",
  },
  {
    title: "Diagramas de fase",
    body: "Muestran cómo evoluciona el sistema en el plano I-V. El campo vectorial, las nulclinas y los equilibrios ayudan a interpretar estabilidad y dirección de cambio.",
  },
  {
    title: "Bifurcación",
    body: "El umbral beta > gamma indica que el brote puede crecer y aparece un equilibrio positivo. Si beta <= gamma, el brote no se sostiene.",
  },
  {
    title: "Sistemas no homogéneos",
    body: "Incorporan fuentes externas dependientes del tiempo: lluvias, shocks de brote, dilución hidráulica o eventos periódicos que modifican la concentración observada.",
  },
  {
    title: "Región segura y Lyapunov",
    body: "V_risk(I,V) = a max(0, I - I_safe)^2 + b max(0, V - V_safe)^2 permite medir cuánto se aleja una trayectoria de la zona considerada segura.",
  },
  {
    title: "Relación con Modelado y Simulación",
    body: "El proyecto integra sistemas autónomos y no homogéneos, no linealidad, estabilidad, bifurcaciones, diagramas de fase, métodos numéricos y simulación computacional.",
  },
];

export default function TheoryPage() {
  return (
    <>
      <PageHeader title="Marco teórico" description="Base conceptual para defender la aplicación desde Modelado y Simulación." />
      <div className="grid gap-5">
        {sections.map((section) => (
          <Card key={section.title} title={section.title}>
            <p className="text-sm leading-6 text-slate-700">{section.body}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
