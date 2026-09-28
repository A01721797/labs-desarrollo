import { MODES, RATING_LABELS } from '../cocomo.js';

const fmt = (n, d = 2) => n.toLocaleString('es-MX', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function Results({ result: r, kloc }) {
  const inter = r.model === 'intermediate';
  const cards = [
    [fmt(r.effort), 'Esfuerzo (persona-mes)'],
    [fmt(r.time), 'Tiempo de desarrollo (meses)'],
    [fmt(r.staff), 'Personal promedio'],
    [fmt(r.productivity, 0), 'Productividad (LOC/persona-mes)'],
    ...(r.cost !== null ? [['$' + fmt(r.cost, 0), 'Costo estimado']] : []),
    ...(inter ? [[fmt(r.eaf, 4), 'EAF (factor de ajuste)']] : []),
  ];
  const formulas =
    `Modo: ${MODES[r.mode].label}   (a=${r.a}, b=${r.b}, c=${r.c}, d=${r.d})\n` +
    `E = a · KLOC^b${inter ? ' · EAF' : ''} = ${r.a} · ${kloc}^${r.b}${inter ? ` · ${r.eaf.toFixed(4)}` : ''} = ${fmt(r.effort)} PM\n` +
    `TDEV = c · E^d = ${r.c} · ${fmt(r.effort)}^${r.d} = ${fmt(r.time)} meses\n` +
    `Personal = E / TDEV = ${fmt(r.staff)} personas`;

  return (
    <section aria-labelledby="h-res" aria-live="polite">
      <h2 id="h-res">Resultado</h2>
      <div className="cards">
        {cards.map(([v, l]) => (
          <div className="card" key={l}><div className="v">{v}</div><div className="l">{l}</div></div>
        ))}
      </div>
      <details open>
        <summary>Fórmulas aplicadas</summary>
        <pre>{formulas}</pre>
      </details>
      {inter && (
        <>
          <h3>Multiplicadores aplicados</h3>
          <div className="scroll">
            <table>
              <thead><tr><th>Driver</th><th>Nivel</th><th className="num">Multiplicador</th></tr></thead>
              <tbody>
                {r.applied.map((a) => (
                  <tr key={a.id}><td>{a.id}</td><td>{RATING_LABELS[a.rating]}</td><td className="num">{a.multiplier.toFixed(2)}</td></tr>
                ))}
                <tr><th colSpan={2}>EAF (producto)</th><th className="num">{r.eaf.toFixed(4)}</th></tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
