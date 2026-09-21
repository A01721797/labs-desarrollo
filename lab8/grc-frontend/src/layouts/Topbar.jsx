import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="topbar">
      <span>{user?.name} · {user?.role}</span>
      <Button variant="secondary" onClick={() => { logout(); navigate('/'); }}>Sign out</Button>
    </header>
  );
}
