import { Link } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import formatDate from '../../../utils/formatDate';

export default function AuditList({ audits }) {
  return (
    <ul className="plain-list">
      {audits.map((a) => (
        <li key={a.id}>
          <Link to={`/audits/${a.id}`}>{a.title}</Link> <Badge label={a.status} /> · {formatDate(a.startDate)}
        </li>
      ))}
    </ul>
  );
}
