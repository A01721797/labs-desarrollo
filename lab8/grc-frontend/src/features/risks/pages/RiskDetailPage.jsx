import ResourceDetailPage from '../../shared/ResourceDetailPage';
import api from '../../../api/riskApi';
import RiskDetailPanel from '../components/RiskDetailPanel';
import useRisks from '../hooks/useRisks';
import { riskConfig } from '../riskConstants';

export default function RiskDetailPage() {
  return <ResourceDetailPage config={riskConfig} api={api} resource={useRisks()} DetailPanel={RiskDetailPanel} />;
}
