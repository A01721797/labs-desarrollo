import formatDate from '../../../utils/formatDate';

export default function PolicyVersionHistory({ policy }) {
  const entries = [...(policy.history ?? [])].reverse();
  return (
    <>
      <h3>Version history</h3>
      <p>Current version: <strong>v{policy.version}</strong></p>
      {entries.length ? (
        <ol className="plain-list">
          {entries.map((h) => (
            <li key={h.version}>v{h.version} — {formatDate(h.date)} — {h.note}</li>
          ))}
        </ol>
      ) : (
        <p>No previous versions.</p>
      )}
    </>
  );
}
