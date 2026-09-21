import PolicyDetailPanel from '../components/PolicyDetailPanel';
import ResourceListPage from '../../shared/ResourceListPage';
import usePolicies from '../hooks/usePolicies';
import { policyConfig } from '../policyConstants';

export default function PolicyListPage() {
  return <ResourceListPage config={policyConfig} resource={usePolicies()} DetailPanel={PolicyDetailPanel} />;
}
