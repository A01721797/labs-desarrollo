import { FRAMEWORKS } from '../../utils/constants';

export const AUDIT_STATUSES = ['Planned', 'In progress', 'Completed'];

export const auditConfig = {
  noun: 'Audit',
  title: 'Audits',
  path: 'audits',
  titleField: 'title',
  initialValues: { title: '', framework: '', status: 'Planned', auditor: '', startDate: '', endDate: '', description: '' },
  fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'framework', label: 'Framework', type: 'select', options: FRAMEWORKS, required: true },
    { name: 'status', label: 'Status', type: 'select', options: AUDIT_STATUSES, required: true, badge: true },
    { name: 'auditor', label: 'Auditor', type: 'text', required: true },
    { name: 'startDate', label: 'Start date', type: 'date', required: true },
    { name: 'endDate', label: 'End date', type: 'date' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'framework', label: 'Framework' },
    { key: 'status', label: 'Status', badge: true },
    { key: 'auditor', label: 'Auditor' },
    { key: 'startDate', label: 'Start', date: true },
    { key: 'endDate', label: 'End', date: true },
  ],
  filters: [
    { name: 'status', label: 'Status', options: AUDIT_STATUSES },
    { name: 'framework', label: 'Framework', options: FRAMEWORKS },
  ],
};
