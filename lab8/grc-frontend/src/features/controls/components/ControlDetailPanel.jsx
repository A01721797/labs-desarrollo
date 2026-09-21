import RecordDetail from '../../shared/RecordDetail';
import { controlConfig } from '../controlConstants';

export default function ControlDetailPanel({ record }) {
  return <RecordDetail config={controlConfig} record={record} />;
}
