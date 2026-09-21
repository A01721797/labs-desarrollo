import { Link } from 'react-router-dom';
import ControlTestResultBadge from './ControlTestResultBadge';

export default function ControlList({ controls }) {
  return (
    <ul className="plain-list">
      {controls.map((c) => (
        <li key={c.id}>
          <Link to={`/controls/${c.id}`}>{c.name}</Link> <ControlTestResultBadge result={c.testResult} />
        </li>
      ))}
    </ul>
  );
}
