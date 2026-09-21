import { Outlet } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
  const { user, login } = useAuth();
  if (!user) {
    return (
      <main className="signed-out">
        <h1>You are signed out</h1>
        <Button onClick={login}>Sign in as demo user</Button>
      </main>
    );
  }
  return <Outlet />;
}
