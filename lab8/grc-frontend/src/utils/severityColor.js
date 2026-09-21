// Maps a status/severity label to a badge tone (styled in index.css as .badge--<tone>).
const TONES = {
  Critical: 'danger', High: 'danger', Fail: 'danger', Open: 'warning',
  Medium: 'warning', Mitigating: 'warning', 'In progress': 'info', Draft: 'neutral',
  Low: 'success', Closed: 'success', Pass: 'success', Published: 'success', Completed: 'success',
  Planned: 'info', 'Not tested': 'neutral',
};

export default function severityColor(label) {
  return TONES[label] ?? 'neutral';
}
