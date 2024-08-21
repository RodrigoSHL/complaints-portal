// types.ts
export interface Metadata {
  department: string;
  priority: string;
}

export interface IComplaint {
  _id: string;
  fullNameComplainant: string;
  documentNumber: string;
  emailComplainant: string;
  description: string;
  fullNameDefendant: string;
  status: string;
  dateFiled: string;
  dueDate: string;
  resolution: string | null;
  assignedTo: string;
  metadata: Metadata;
  isDeleted: boolean;
  deletedAt: string | null;
  idComplaint: string;
  passComplaint: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}