export interface Control {
  id: string;
  name: string;
  framework: string;
  type: 'Preventive' | 'Detective' | 'Corrective';
  frequency: string;
  testResult: 'Pass' | 'Fail' | 'Not tested';
  owner: string;
  description: string;
}
