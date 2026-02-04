import { formsStore } from "./store";
import type { Form, FormStatus } from "./types";

export interface ListParams {
  status?: FormStatus;
  sort?: keyof Form;
  order?: "asc" | "desc";
}

export async function getFormsList(params: ListParams = {}): Promise<Form[]> {
  const { status, sort = "updatedAt", order = "desc" } = params;
  let list = await formsStore.getAll();

  if (status) {
    list = list.filter((f) => f.status === status);
  }

  return [...list].sort((a, b) => {
    const aVal = a[sort];
    const bVal = b[sort];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return order === "desc"
        ? bVal.localeCompare(aVal)
        : aVal.localeCompare(bVal);
    }
    return 0;
  });
}
