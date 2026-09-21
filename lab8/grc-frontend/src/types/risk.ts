export interface Risk {
  id: string;
  title: string;
  category: string;
  likelihood: number; // 1-5
  impact: number; // 1-5
  status: 'Open' | 'Mitigating' | 'Closed';
  owner: string;
  dueDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
