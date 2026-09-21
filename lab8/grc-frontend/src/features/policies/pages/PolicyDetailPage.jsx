import ResourceDetailPage from '../../shared/ResourceDetailPage';
import api from '../../../api/policyApi';
import PolicyDetailPanel from '../components/PolicyDetailPanel';
import usePolicies from '../hooks/usePolicies';
import { policyConfig } from '../policyConstants';

export default function PolicyDetailPage() {
  return <ResourceDetailPage config={policyConfig} api={api} resource={usePolicies()} DetailPanel={PolicyDetailPanel} />;
}
