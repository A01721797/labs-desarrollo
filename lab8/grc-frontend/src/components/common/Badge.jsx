import severityColor from '../../utils/severityColor';

// Colour is never the only signal: the label text is always shown.
export default function Badge({ label }) {
  if (!label) return null;
  return <span className={`badge badge--${severityColor(label)}`}>{label}</span>;
}
