import { Menu, Waves } from "lucide-react";
import Button from "../ui/Button";

type NavbarProps = {
  onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Button className="lg:hidden" variant="ghost" onClick={onMenuClick} aria-label="Abrir navegación">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-700 text-white">
            <Waves className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-slate-950">Wastewater Sentinel</p>
            <p className="text-xs text-slate-500">Vigilancia epidemiológica ambiental</p>
          </div>
        </div>
        <span className="hidden rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800 sm:inline-flex">
          Dashboard científico-educativo
        </span>
      </div>
    </header>
  );
}
