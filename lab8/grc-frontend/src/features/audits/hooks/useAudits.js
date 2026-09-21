import useResource from '../../shared/useResource';
import api from '../../../api/auditApi';
import { auditConfig } from '../auditConstants';

export default function useAudits() {
  return useResource(api, auditConfig.noun);
}
