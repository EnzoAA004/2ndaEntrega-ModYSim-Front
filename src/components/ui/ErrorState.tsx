import { AlertTriangle } from "lucide-react";

export default function ErrorState({ message = "No se pudo cargar la información." }: { message?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
