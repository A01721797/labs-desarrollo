export default function ComplianceProgressBar({ value, label = 'Compliance' }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div>
      <div className="progress__label">
        <span>{label}</span>
        <strong>{pct}%</strong>
      </div>
      <div className="progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <div className="progress__bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
