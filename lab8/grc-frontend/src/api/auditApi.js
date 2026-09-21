import { createMockResource } from './mockStore';

const seed = [
  { id: 'a1', title: 'SOC 2 Type II', framework: 'SOC 2', status: 'In progress', auditor: 'Deloitte', startDate: '2026-10-01', endDate: '2026-12-15', description: '', findings: [{ id: 'f1', title: 'Access reviews not evidenced', severity: 'High', status: 'Open' }] },
  { id: 'a2', title: 'ISO 27001 surveillance', framework: 'ISO 27001', status: 'Planned', auditor: 'BSI', startDate: '2027-02-01', endDate: '2027-02-10', description: '', findings: [] },
];

const resource = createMockResource('audits', seed);

export const getAudits = resource.list;
export const getAudit = resource.get;
export const createAudit = (payload) => resource.create({ findings: [], ...payload });
export const updateAudit = resource.update;
export const deleteAudit = resource.remove;
export default resource;
