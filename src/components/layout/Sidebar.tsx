import clsx from "clsx";
import { Activity, BarChart3, Database, FlaskConical, Home, Info, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";

const links = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/measurements", label: "Mediciones", icon: Activity },
  { to: "/dataset", label: "Dataset", icon: Database },
  { to: "/simulations", label: "Simulaciones", icon: BarChart3 },
  { to: "/theory", label: "Marco teórico", icon: FlaskConical },
  { to: "/about", label: "Acerca", icon: Info },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        className={clsx("fixed inset-0 z-40 bg-slate-950/30 lg:hidden", open ? "block" : "hidden")}
        onClick={onClose}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white p-4 transition-transform lg:sticky lg:top-16 lg:z-20 lg:h-[calc(100vh-4rem)] lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <span className="font-semibold text-slate-900">Navegación</span>
          <Button variant="ghost" onClick={onClose} aria-label="Cerrar navegación">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="grid gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
                  isActive ? "bg-cyan-50 text-cyan-800" : "text-slate-700 hover:bg-slate-100",
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
