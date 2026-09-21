import ResourceFormPage from '../../shared/ResourceFormPage';
import api from '../../../api/auditApi';
import useAudits from '../hooks/useAudits';
import { auditConfig } from '../auditConstants';


export default function AuditEditPage() {
  return <ResourceFormPage config={auditConfig} api={api} resource={useAudits()}  />;
}
