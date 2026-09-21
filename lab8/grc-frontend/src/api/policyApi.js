import { createMockResource } from './mockStore';

const seed = [
  { id: 'p1', title: 'Information Security Policy', version: 3, status: 'Published', owner: 'Ana Torres', reviewDate: '2027-03-01', attachment: 'infosec-policy-v3.pdf', description: 'Top-level security policy.', acknowledgedBy: ['Luis Ramos'], history: [{ version: 1, date: '2025-03-01', note: 'Initial release' }, { version: 2, date: '2026-03-01', note: 'Added cloud section' }] },
  { id: 'p2', title: 'Acceptable Use Policy', version: 1, status: 'Draft', owner: 'Maria Lopez', reviewDate: '2027-06-01', attachment: '', description: '', acknowledgedBy: [], history: [] },
];

const resource = createMockResource('policies', seed);
const baseUpdate = resource.update;

// Policies are versioned: every edit bumps the version and archives the previous one.
resource.update = async (id, payload) => {
  const current = await resource.get(id);
  const history = [
    ...(current.history ?? []),
    { version: current.version, date: new Date().toISOString().slice(0, 10), note: payload.changeNote || 'Updated' },
  ];
  const { changeNote, ...rest } = payload;
  return baseUpdate(id, { ...rest, version: current.version + 1, history });
};

export const getPolicies = resource.list;
export const getPolicy = resource.get;
export const createPolicy = (payload) => resource.create({ version: 1, history: [], acknowledgedBy: [], ...payload });
export const updatePolicy = resource.update;
export const deletePolicy = resource.remove;
export default resource;

// Acknowledgements are not document changes, so they bypass versioning.
export const acknowledge = (id, acknowledgedBy) => baseUpdate(id, { acknowledgedBy });
