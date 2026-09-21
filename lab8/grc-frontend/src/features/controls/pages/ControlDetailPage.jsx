import ResourceDetailPage from '../../shared/ResourceDetailPage';
import api from '../../../api/controlApi';
import ControlDetailPanel from '../components/ControlDetailPanel';
import useControls from '../hooks/useControls';
import { controlConfig } from '../controlConstants';

export default function ControlDetailPage() {
  return <ResourceDetailPage config={controlConfig} api={api} resource={useControls()} DetailPanel={ControlDetailPanel} />;
}
