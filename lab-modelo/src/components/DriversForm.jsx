import { DRIVERS, RATINGS, RATING_LABELS } from '../cocomo.js';

const GROUPS = [...new Set(DRIVERS.map((d) => d.group))];

export default function DriversForm({ ratings, eaf, onChange, onReset }) {
  return (
    <section aria-labelledby="h-drv">
      <h2 id="h-drv">Cost drivers <span className="pill">EAF = {eaf.toFixed(4)}</span></h2>
      {GROUPS.map((g) => (
        <div className="driver-group" key={g}>
          <h3>{g}</h3>
          <div className="grid">
            {DRIVERS.filter((d) => d.group === g).map((d) => (
              <label key={d.id}>
                {d.id} — {d.label}
                <select value={ratings[d.id] ?? 'N'} onChange={(e) => onChange(d.id, e.target.value)}>
                  {RATINGS.filter((r) => r in d.m).map((r) => (
                    <option key={r} value={r}>{RATING_LABELS[r]} ({d.m[r].toFixed(2)})</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button type="button" className="secondary" onClick={onReset}>Restablecer a Nominal</button>
    </section>
  );
}
