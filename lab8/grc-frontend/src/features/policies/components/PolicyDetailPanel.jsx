import RecordDetail from '../../shared/RecordDetail';
import { policyConfig } from '../policyConstants';
import PolicyAcknowledgementTracker from './PolicyAcknowledgementTracker';
import PolicyVersionHistory from './PolicyVersionHistory';

export default function PolicyDetailPanel({ record, onChange }) {
  return (
    <RecordDetail config={{ ...policyConfig, fields: policyConfig.fields.filter((f) => !f.formOnly) }} record={record}>
      <PolicyVersionHistory policy={record} />
      <PolicyAcknowledgementTracker policy={record} onChange={onChange} />
    </RecordDetail>
  );
}
