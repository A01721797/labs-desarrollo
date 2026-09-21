import AuditDetailPanel from '../components/AuditDetailPanel';
import ResourceListPage from '../../shared/ResourceListPage';
import useAudits from '../hooks/useAudits';
import { auditConfig } from '../auditConstants';

export default function AuditListPage() {
  return <ResourceListPage config={auditConfig} resource={useAudits()} DetailPanel={AuditDetailPanel} />;
}
