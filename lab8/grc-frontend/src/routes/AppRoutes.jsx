import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from '../dashboard/DashboardPage';
import AuditCreatePage from '../features/audits/pages/AuditCreatePage';
import AuditDetailPage from '../features/audits/pages/AuditDetailPage';
import AuditEditPage from '../features/audits/pages/AuditEditPage';
import AuditListPage from '../features/audits/pages/AuditListPage';
import ControlCreatePage from '../features/controls/pages/ControlCreatePage';
import ControlDetailPage from '../features/controls/pages/ControlDetailPage';
import ControlEditPage from '../features/controls/pages/ControlEditPage';
import ControlLibraryPage from '../features/controls/pages/ControlLibraryPage';
import PolicyCreatePage from '../features/policies/pages/PolicyCreatePage';
import PolicyDetailPage from '../features/policies/pages/PolicyDetailPage';
import PolicyEditPage from '../features/policies/pages/PolicyEditPage';
import PolicyListPage from '../features/policies/pages/PolicyListPage';
import RiskCreatePage from '../features/risks/pages/RiskCreatePage';
import RiskDetailPage from '../features/risks/pages/RiskDetailPage';
import RiskEditPage from '../features/risks/pages/RiskEditPage';
import RiskRegisterPage from '../features/risks/pages/RiskRegisterPage';
import DashboardLayout from '../layouts/DashboardLayout';
import PrivateRoute from './PrivateRoute';

const crud = (path, List, Create, Edit, Detail) => [
  <Route key={`${path}-l`} path={path} element={<List />} />,
  <Route key={`${path}-n`} path={`${path}/new`} element={<Create />} />,
  <Route key={`${path}-e`} path={`${path}/:id/edit`} element={<Edit />} />,
  <Route key={`${path}-d`} path={`${path}/:id`} element={<Detail />} />,
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          {crud('risks', RiskRegisterPage, RiskCreatePage, RiskEditPage, RiskDetailPage)}
          {crud('controls', ControlLibraryPage, ControlCreatePage, ControlEditPage, ControlDetailPage)}
          {crud('policies', PolicyListPage, PolicyCreatePage, PolicyEditPage, PolicyDetailPage)}
          {crud('audits', AuditListPage, AuditCreatePage, AuditEditPage, AuditDetailPage)}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}
