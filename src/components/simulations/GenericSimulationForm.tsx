import { useState } from "react";
import type { SimulationResult } from "../../types/simulation";
import { getApiErrorMessage } from "../../api/client";
import Button from "../ui/Button";
import ErrorState from "../ui/ErrorState";
import Input from "../ui/Input";
import Select from "../ui/Select";
import type { FieldConfig } from "./formHelpers";
import { numberFromForm, validateCommon } from "./formHelpers";

type GenericSimulationFormProps = {
  fields: FieldConfig[];
  defaults: Record<string, string | number>;
  onSubmit: (payload: Record<string, unknown>) => Promise<SimulationResult>;
  onResult: (result: SimulationResult) => void;
  submitLabel?: string;
};

export default function GenericSimulationForm({
  fields,
  defaults,
  onSubmit,
  onResult,
  submitLabel = "Ejecutar simulación",
}: GenericSimulationFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [requestError, setRequestError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = {};
    fields.forEach((field) => {
      const value = formData.get(field.name);
      payload[field.name] = field.type === "select" || field.type === "text" ? String(value ?? "") : numberFromForm(value);
    });
    const validationErrors = validateCommon(payload);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    setLoading(true);
    setRequestError("");
    try {
      onResult(await onSubmit(payload));
    } catch (error) {
      setRequestError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {requestError && <ErrorState message={requestError} />}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {fields.map((field) =>
          field.type === "select" ? (
            <Select
              key={field.name}
              name={field.name}
              label={field.label}
              defaultValue={defaults[field.name]}
              options={field.options ?? []}
              helperText={field.helperText}
              error={errors[field.name]}
            />
          ) : (
            <Input
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type ?? "number"}
              step="any"
              defaultValue={defaults[field.name]}
              helperText={field.helperText}
              error={errors[field.name]}
            />
          ),
        )}
      </div>
      <Button type="submit" disabled={loading}>{loading ? "Ejecutando..." : submitLabel}</Button>
    </form>
  );
}
