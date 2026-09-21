import Badge from '../../../components/common/Badge';
import { riskScore, scoreLevel } from '../riskConstants';

// Live likelihood × impact score shown while editing the form.
export default function RiskScoreCalculator({ values }) {
  const score = riskScore(values);
  return (
    <p className="score" role="status">
      Risk score: <strong>{score}</strong> <Badge label={scoreLevel(score)} />
    </p>
  );
}
