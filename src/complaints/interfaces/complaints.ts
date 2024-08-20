// types.ts
export interface Metadata {
  department: string;
  priority: string;
  category: string;
}

export interface IComplaint {
  _id: string;
  title: string;
  description: string;
  complainant: string;
  defendant: string;
  status: string;
  dateFiled: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  idComplaint: string;
  metadata: Metadata;
  isDeleted: boolean;
  deletedAt: string;
  __v: number;
}
