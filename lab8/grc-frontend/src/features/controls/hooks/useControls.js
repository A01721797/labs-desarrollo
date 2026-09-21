import useResource from '../../shared/useResource';
import api from '../../../api/controlApi';
import { controlConfig } from '../controlConstants';

export default function useControls() {
  return useResource(api, controlConfig.noun);
}
