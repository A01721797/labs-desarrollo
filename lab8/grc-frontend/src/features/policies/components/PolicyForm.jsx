import EntityForm from '../../../components/forms/EntityForm';
import { policyConfig } from '../policyConstants';

export default function PolicyForm({ initialValues = policyConfig.initialValues, ...props }) {
  return <EntityForm fields={policyConfig.fields} initialValues={initialValues} {...props} />;
}
