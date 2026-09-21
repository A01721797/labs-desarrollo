import ResourceFormPage from '../../shared/ResourceFormPage';
import api from '../../../api/controlApi';
import useControls from '../hooks/useControls';
import { controlConfig } from '../controlConstants';


export default function ControlCreatePage() {
  return <ResourceFormPage config={controlConfig} api={api} resource={useControls()}  />;
}
