import { FRAMEWORKS } from '../../utils/constants';

export const CONTROL_TYPES = ['Preventive', 'Detective', 'Corrective'];
export const FREQUENCIES = ['Continuous', 'Monthly', 'Quarterly', 'Annually'];
export const TEST_RESULTS = ['Pass', 'Fail', 'Not tested'];

export const controlConfig = {
  noun: 'Control',
  title: 'Control Library',
  path: 'controls',
  titleField: 'name',
  initialValues: { name: '', framework: '', type: '', frequency: '', testResult: 'Not tested', owner: '', description: '' },
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'framework', label: 'Framework', type: 'select', options: FRAMEWORKS, required: true },
    { name: 'type', label: 'Type', type: 'select', options: CONTROL_TYPES, required: true },
    { name: 'frequency', label: 'Frequency', type: 'select', options: FREQUENCIES, required: true },
    { name: 'testResult', label: 'Test result', type: 'select', options: TEST_RESULTS, badge: true },
    { name: 'owner', label: 'Owner', type: 'owner', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'framework', label: 'Framework' },
    { key: 'type', label: 'Type' },
    { key: 'frequency', label: 'Frequency' },
    { key: 'testResult', label: 'Test result', badge: true },
    { key: 'owner', label: 'Owner' },
  ],
  filters: [
    { name: 'framework', label: 'Framework', options: FRAMEWORKS },
    { name: 'testResult', label: 'Test result', options: TEST_RESULTS },
    { name: 'type', label: 'Type', options: CONTROL_TYPES },
  ],
};
