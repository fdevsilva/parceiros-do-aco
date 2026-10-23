"use client";

export interface Pill {
  key: string;
  label: string;
}

export default function FilterPills({
  pills,
  active,
  onChange,
}: {
  pills: Pill[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="filters">
      {pills.map((p) => (
        <button
          key={p.key}
          onClick={() => onChange(p.key)}
          className={`pill${p.key === active ? " pill--active" : ""}`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
