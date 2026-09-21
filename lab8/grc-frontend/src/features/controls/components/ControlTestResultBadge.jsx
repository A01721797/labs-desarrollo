import Badge from '../../../components/common/Badge';

export default function ControlTestResultBadge({ result }) {
  return <Badge label={result || 'Not tested'} />;
}
