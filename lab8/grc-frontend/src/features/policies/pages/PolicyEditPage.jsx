import ResourceFormPage from '../../shared/ResourceFormPage';
import api from '../../../api/policyApi';
import usePolicies from '../hooks/usePolicies';
import { policyConfig } from '../policyConstants';


export default function PolicyEditPage() {
  return <ResourceFormPage config={policyConfig} api={api} resource={usePolicies()}  />;
}
