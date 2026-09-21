import RiskDetailPanel from '../components/RiskDetailPanel';
import ResourceListPage from '../../shared/ResourceListPage';
import useRisks from '../hooks/useRisks';
import { riskConfig } from '../riskConstants';

export default function RiskRegisterPage() {
  return <ResourceListPage config={riskConfig} resource={useRisks()} DetailPanel={RiskDetailPanel} />;
}
