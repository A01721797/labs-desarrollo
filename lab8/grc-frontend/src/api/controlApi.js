import { createMockResource } from './mockStore';

const seed = [
  { id: 'c1', name: 'Quarterly access review', framework: 'SOC 2', type: 'Detective', frequency: 'Quarterly', testResult: 'Pass', owner: 'Ana Torres', description: 'Review of privileged access across core systems.' },
  { id: 'c2', name: 'Automated patch management', framework: 'ISO 27001', type: 'Preventive', frequency: 'Monthly', testResult: 'Fail', owner: 'Luis Ramos', description: '' },
  { id: 'c3', name: 'Vendor security assessment', framework: 'NIST CSF', type: 'Preventive', frequency: 'Annually', testResult: 'Not tested', owner: 'Maria Lopez', description: '' },
];

const resource = createMockResource('controls', seed);

export const getControls = resource.list;
export const getControl = resource.get;
export const createControl = resource.create;
export const updateControl = resource.update;
export const deleteControl = resource.remove;
export default resource;
