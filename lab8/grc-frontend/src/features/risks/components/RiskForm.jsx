import EntityForm from '../../../components/forms/EntityForm';
import { riskConfig } from '../riskConstants';
import RiskScoreCalculator from './RiskScoreCalculator';

// Shared Create/Edit form (also usable standalone, e.g. inside a modal).
export default function RiskForm({ initialValues = riskConfig.initialValues, ...props }) {
  return (
    <EntityForm fields={riskConfig.fields} initialValues={initialValues} {...props}>
      {(values) => <RiskScoreCalculator values={values} />}
    </EntityForm>
  );
}
