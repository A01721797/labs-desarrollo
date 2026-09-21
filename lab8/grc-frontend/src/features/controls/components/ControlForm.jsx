import EntityForm from '../../../components/forms/EntityForm';
import { controlConfig } from '../controlConstants';

// Standalone wrapper for use outside the create/edit pages (e.g. in a modal).
export default function ControlForm({ initialValues = controlConfig.initialValues, ...props }) {
  return <EntityForm fields={controlConfig.fields} initialValues={initialValues} {...props} />;
}
