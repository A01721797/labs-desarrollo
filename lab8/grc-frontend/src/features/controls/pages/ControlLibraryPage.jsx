import ControlDetailPanel from '../components/ControlDetailPanel';
import ResourceListPage from '../../shared/ResourceListPage';
import useControls from '../hooks/useControls';
import { controlConfig } from '../controlConstants';

export default function ControlLibraryPage() {
  return <ResourceListPage config={controlConfig} resource={useControls()} DetailPanel={ControlDetailPanel} />;
}
