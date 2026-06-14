import Select from "../ui/Select";

export default function LocationSelector({
  locations,
  value,
  onChange,
}: {
  locations: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      label="Ubicación analizada"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      options={locations.map((location) => ({ label: location, value: location }))}
    />
  );
}
