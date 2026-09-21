export const POLICY_STATUSES = ['Draft', 'Published'];

export const policyConfig = {
  noun: 'Policy',
  title: 'Policies',
  path: 'policies',
  titleField: 'title',
  initialValues: { title: '', status: 'Draft', owner: '', reviewDate: '', attachment: '', description: '', changeNote: '' },
  fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'status', label: 'Status', type: 'select', options: POLICY_STATUSES, required: true, badge: true },
    { name: 'owner', label: 'Owner', type: 'owner', required: true },
    { name: 'reviewDate', label: 'Next review', type: 'date' },
    { name: 'attachment', label: 'Policy document', type: 'file' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'changeNote', label: 'Change note (saved in version history)', type: 'text', formOnly: true },
  ],
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'version', label: 'Version' },
    { key: 'status', label: 'Status', badge: true },
    { key: 'owner', label: 'Owner' },
    { key: 'reviewDate', label: 'Next review', date: true },
  ],
  filters: [{ name: 'status', label: 'Status', options: POLICY_STATUSES }],
};
