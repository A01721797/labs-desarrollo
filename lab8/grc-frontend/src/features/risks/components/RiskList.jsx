import { Link } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import { riskScore, scoreLevel } from '../riskConstants';

// Compact list of risks (used on the dashboard).
export default function RiskList({ risks }) {
  return (
    <ul className="plain-list">
      {risks.map((r) => (
        <li key={r.id}>
          <Link to={`/risks/${r.id}`}>{r.title}</Link> <Badge label={scoreLevel(riskScore(r))} />
        </li>
      ))}
    </ul>
  );
}
