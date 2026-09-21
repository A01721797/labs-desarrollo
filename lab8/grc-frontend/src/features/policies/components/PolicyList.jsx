import { Link } from 'react-router-dom';
import Badge from '../../../components/common/Badge';

export default function PolicyList({ policies }) {
  return (
    <ul className="plain-list">
      {policies.map((p) => (
        <li key={p.id}>
          <Link to={`/policies/${p.id}`}>{p.title}</Link> <Badge label={p.status} />
        </li>
      ))}
    </ul>
  );
}
