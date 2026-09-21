import { Link } from 'react-router-dom';
import RiskList from '../../features/risks/components/RiskList';
import { riskScore } from '../../features/risks/riskConstants';

export default function OpenRisksSummary({ risks }) {
  const top = risks.filter((r) => r.status !== 'Closed').sort((a, b) => riskScore(b) - riskScore(a)).slice(0, 5);
  return (
    <section className="panel" aria-labelledby="open-risks">
      <h2 id="open-risks">Top open risks</h2>
      {top.length ? <RiskList risks={top} /> : <p>No open risks.</p>}
      <Link to="/risks">View register</Link>
    </section>
  );
}
