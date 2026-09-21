import ResourceDetailPage from '../../shared/ResourceDetailPage';
import api from '../../../api/auditApi';
import AuditDetailPanel from '../components/AuditDetailPanel';
import useAudits from '../hooks/useAudits';
import { auditConfig } from '../auditConstants';

export default function AuditDetailPage() {
  return <ResourceDetailPage config={auditConfig} api={api} resource={useAudits()} DetailPanel={AuditDetailPanel} />;
}
