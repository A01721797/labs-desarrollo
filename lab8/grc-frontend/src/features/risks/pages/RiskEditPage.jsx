import ResourceFormPage from '../../shared/ResourceFormPage';
import api from '../../../api/riskApi';
import useRisks from '../hooks/useRisks';
import { riskConfig } from '../riskConstants';
import RiskScoreCalculator from '../components/RiskScoreCalculator';

export default function RiskEditPage() {
  return <ResourceFormPage config={riskConfig} api={api} resource={useRisks()} renderExtra={(values) => <RiskScoreCalculator values={values} />} />;
}
