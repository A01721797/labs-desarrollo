const LEVELS = [5, 4, 3, 2, 1];
const tone = (score) => (score >= 15 ? 'danger' : score >= 8 ? 'warning' : score >= 4 ? 'info' : 'success');

// Likelihood x impact matrix. Rendered as a real table so it is readable by screen readers.
export default function RiskHeatMap({ risks }) {
  const count = (l, i) => risks.filter((r) => r.likelihood === l && r.impact === i && r.status !== 'Closed').length;
  return (
    <div className="heatmap-wrap">
      <table className="heatmap">
        <caption>Open risks by likelihood (rows) and impact (columns)</caption>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Likelihood \ Impact</span></th>
            {[1, 2, 3, 4, 5].map((i) => (
              <th key={i} scope="col">Impact {i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {LEVELS.map((l) => (
            <tr key={l}>
              <th scope="row">Likelihood {l}</th>
              {[1, 2, 3, 4, 5].map((i) => (
                <td key={i} className={`heat heat--${tone(l * i)}`}>
                  {count(l, i) || <span className="sr-only">0</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
