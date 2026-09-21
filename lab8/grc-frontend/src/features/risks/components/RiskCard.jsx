import { Link } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import { riskScore, scoreLevel } from '../riskConstants';

export default function RiskCard({ risk }) {
  return (
    <article className="card">
      <h3><Link to={`/risks/${risk.id}`}>{risk.title}</Link></h3>
      <p>{risk.category} · {risk.owner}</p>
      <Badge label={scoreLevel(riskScore(risk))} /> <Badge label={risk.status} />
    </article>
  );
}
