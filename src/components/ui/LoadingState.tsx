export default function LoadingState({ message = "Cargando información..." }: { message?: string }) {
  return (
    <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
      {message}
    </div>
  );
}
