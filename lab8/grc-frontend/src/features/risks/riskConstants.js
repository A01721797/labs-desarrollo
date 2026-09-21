export const RISK_CATEGORIES = ['Technology', 'Operational', 'Compliance', 'Third party', 'Financial', 'Strategic'];
export const RISK_STATUSES = ['Open', 'Mitigating', 'Closed'];
export const SCALE = [1, 2, 3, 4, 5];

export const riskScore = (r) => (Number(r.likelihood) || 0) * (Number(r.impact) || 0);
export const scoreLevel = (score) => (score >= 15 ? 'Critical' : score >= 10 ? 'High' : score >= 5 ? 'Medium' : 'Low');

export const riskConfig = {
  noun: 'Risk',
  title: 'Risk Register',
  path: 'risks',
  titleField: 'title',
  initialValues: { title: '', category: '', likelihood: 1, impact: 1, status: 'Open', owner: '', dueDate: '', description: '' },
  decorate: (r) => ({ ...r, score: riskScore(r), level: scoreLevel(riskScore(r)) }),
  fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'select', options: RISK_CATEGORIES, required: true },
    { name: 'likelihood', label: 'Likelihood (1-5)', type: 'number', min: 1, max: 5, required: true },
    { name: 'impact', label: 'Impact (1-5)', type: 'number', min: 1, max: 5, required: true },
    { name: 'status', label: 'Status', type: 'select', options: RISK_STATUSES, required: true, badge: true },
    { name: 'owner', label: 'Owner', type: 'owner', required: true },
    { name: 'dueDate', label: 'Due date', type: 'date' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'level', label: 'Severity', badge: true },
    { key: 'score', label: 'Score' },
    { key: 'status', label: 'Status', badge: true },
    { key: 'owner', label: 'Owner' },
    { key: 'dueDate', label: 'Due', date: true },
  ],
  filters: [
    { name: 'status', label: 'Status', options: RISK_STATUSES },
    { name: 'level', label: 'Severity', options: ['Low', 'Medium', 'High', 'Critical'] },
    { name: 'category', label: 'Category', options: RISK_CATEGORIES },
  ],
};
