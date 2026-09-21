import useResource from '../../shared/useResource';
import api from '../../../api/riskApi';
import { riskConfig } from '../riskConstants';

export default function useRisks() {
  return useResource(api, riskConfig.noun);
}
