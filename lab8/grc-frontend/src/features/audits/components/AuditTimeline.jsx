import formatDate from '../../../utils/formatDate';

export default function AuditTimeline({ audit }) {
  const steps = [
    { label: 'Start', date: audit.startDate },
    { label: 'End', date: audit.endDate },
  ];
  return (
    <>
      <h3>Timeline</h3>
      <ol className="timeline">
        {steps.map((s) => (
          <li key={s.label}><strong>{s.label}:</strong> {formatDate(s.date)}</li>
        ))}
      </ol>
    </>
  );
}
