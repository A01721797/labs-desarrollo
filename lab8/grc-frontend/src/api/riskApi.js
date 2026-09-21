import { createMockResource } from './mockStore';

const seed = [
  { id: 'r1', title: 'Unpatched production servers', category: 'Technology', likelihood: 4, impact: 5, status: 'Open', owner: 'Ana Torres', dueDate: '2026-11-30', description: 'Critical CVEs remain open on several production hosts.' },
  { id: 'r2', title: 'Vendor data breach', category: 'Third party', likelihood: 3, impact: 4, status: 'Mitigating', owner: 'Luis Ramos', dueDate: '2026-12-15', description: 'A key SaaS vendor stores customer PII.' },
  { id: 'r3', title: 'Regulatory reporting delay', category: 'Compliance', likelihood: 2, impact: 3, status: 'Open', owner: 'Maria Lopez', dueDate: '2027-01-20', description: '' },
  { id: 'r4', title: 'Key-person dependency in finance', category: 'Operational', likelihood: 2, impact: 2, status: 'Closed', owner: 'Carlos Vega', dueDate: '2026-09-01', description: '' },
];

const resource = createMockResource('risks', seed);

export const getRisks = resource.list;
export const getRisk = resource.get;
export const createRisk = resource.create;
export const updateRisk = resource.update;
export const deleteRisk = resource.remove;
export default resource;
