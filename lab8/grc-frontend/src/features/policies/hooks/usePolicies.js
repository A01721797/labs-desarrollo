import useResource from '../../shared/useResource';
import api from '../../../api/policyApi';
import { policyConfig } from '../policyConstants';

export default function usePolicies() {
  return useResource(api, policyConfig.noun);
}
