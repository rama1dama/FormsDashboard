export type Role = "Individual" | "Admin";

export type FormStatus = "draft" | "active" | "archived";

export interface Form {
  id: string;
  title: string;
  description?: string;
  fieldsCount: number;
  status: FormStatus;
  updatedAt: string;
  createdAt: string;
}

export interface FormCreateInput {
  title: string;
  description?: string;
  fieldsCount: number;
  status: FormStatus;
}

export type FormUpdateInput = FormCreateInput;
