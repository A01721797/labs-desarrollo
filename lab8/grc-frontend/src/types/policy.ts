export interface PolicyVersion {
  version: number;
  date: string;
  note: string;
}

export interface Policy {
  id: string;
  title: string;
  version: number;
  status: 'Draft' | 'Published';
  owner: string;
  reviewDate: string;
  attachment: string;
  description: string;
  acknowledgedBy: string[];
  history: PolicyVersion[];
}
