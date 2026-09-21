const COLORS = ['var(--c-danger)', 'var(--c-warning)', 'var(--c-success)', 'var(--c-info)', 'var(--c-neutral)'];

// SVG donut with a text legend, so values are available beyond colour alone.
export default function StatusDonutChart({ data, title }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 40;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <figure className="donut">
      <svg viewBox="0 0 100 100" role="img" aria-label={`${title}: ${data.map((d) => `${d.label} ${d.value}`).join(', ')}`}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--c-border)" strokeWidth="14" />
        {total > 0 &&
          data.map((d, i) => {
            const len = (d.value / total) * circ;
            const el = (
              <circle
                key={d.label}
                cx="50" cy="50" r={r} fill="none"
                stroke={COLORS[i % COLORS.length]} strokeWidth="14"
                strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-offset}
                transform="rotate(-90 50 50)"
              />
            );
            offset += len;
            return el;
          })}
        <text x="50" y="54" textAnchor="middle" fontSize="14" fill="currentColor">{total}</text>
      </svg>
      <figcaption>
        <strong>{title}</strong>
        <ul>
          {data.map((d, i) => (
            <li key={d.label}><span className="swatch" style={{ background: COLORS[i % COLORS.length] }} aria-hidden="true" />{d.label}: {d.value}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
