export interface Finding {
  id: string;
  title: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Closed';
}

export interface Audit {
  id: string;
  title: string;
  framework: string;
  status: 'Planned' | 'In progress' | 'Completed';
  auditor: string;
  startDate: string;
  endDate: string;
  description: string;
  findings: Finding[];
}
