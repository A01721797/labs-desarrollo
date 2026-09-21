import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/risks', label: 'Risks' },
  { to: '/controls', label: 'Controls' },
  { to: '/policies', label: 'Policies' },
  { to: '/audits', label: 'Audits' },
];

export default function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Main">
      <div className="brand">GRC Platform</div>
      <ul>
        {LINKS.map((l) => (
          <li key={l.to}>
            <NavLink to={l.to} end={l.end}>{l.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
