import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout() {
  return (
    <div className="shell">
      <a href="#main" className="skip-link">Skip to content</a>
      <Sidebar />
      <div className="shell__body">
        <Topbar />
        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
