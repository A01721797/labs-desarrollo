import RecordDetail from '../../shared/RecordDetail';
import { auditConfig } from '../auditConstants';
import AuditFindingsList from './AuditFindingsList';
import AuditTimeline from './AuditTimeline';

export default function AuditDetailPanel({ record, onChange }) {
  return (
    <RecordDetail config={auditConfig} record={record}>
      <AuditTimeline audit={record} />
      <AuditFindingsList audit={record} onChange={onChange} />
    </RecordDetail>
  );
}
