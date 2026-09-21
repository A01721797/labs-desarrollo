import EntityForm from '../../../components/forms/EntityForm';
import { auditConfig } from '../auditConstants';

export default function AuditForm({ initialValues = auditConfig.initialValues, ...props }) {
  return <EntityForm fields={auditConfig.fields} initialValues={initialValues} {...props} />;
}
