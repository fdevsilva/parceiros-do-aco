export default function SummaryCard({
  label,
  value,
  tone,
  hint,
  hintTone,
}: {
  label: string;
  value: string;
  tone?: "green" | "amber" | "red";
  hint?: React.ReactNode;
  hintTone?: "green" | "red";
}) {
  return (
    <div className="summary-card">
      <p className="summary-card__label">{label}</p>
      <p className={`summary-card__value${tone ? ` summary-card__value--${tone}` : ""}`}>{value}</p>
      {hint && <p className={`summary-card__hint${hintTone ? ` summary-card__hint--${hintTone}` : ""}`}>{hint}</p>}
    </div>
  );
}
