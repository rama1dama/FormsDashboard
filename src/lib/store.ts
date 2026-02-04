import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

import type { Form, FormCreateInput } from "./types";

const SEED_FORMS: Form[] = [
  {
    id: "1",
    title: "Contact Form",
    description: "Main website contact form",
    fieldsCount: 5,
    status: "active",
    updatedAt: "2025-02-04T12:00:00.000Z",
    createdAt: "2025-02-01T10:00:00.000Z",
  },
  {
    id: "2",
    title: "Survey 2025",
    description: "Annual feedback survey",
    fieldsCount: 12,
    status: "draft",
    updatedAt: "2025-02-03T09:30:00.000Z",
    createdAt: "2025-02-02T14:00:00.000Z",
  },
  {
    id: "3",
    title: "Registration",
    fieldsCount: 8,
    status: "archived",
    updatedAt: "2025-01-15T16:00:00.000Z",
    createdAt: "2024-12-01T08:00:00.000Z",
  },
];

const DATA_DIR = path.resolve(process.cwd(), "data");
const FORMS_FILE = path.resolve(DATA_DIR, "forms.json");

function getNextId(forms: Form[]): string {
  const max = forms.reduce(
    (acc, f) => Math.max(acc, parseInt(f.id, 10) || 0),
    0
  );
  return String(max + 1);
}

async function readFormsFromFile(): Promise<Form[]> {
  try {
    const raw = await readFile(FORMS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Form[];
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[forms-store] Could not read forms.json, using seed:", err instanceof Error ? err.message : String(err));
    }
  }
  const seed = [...SEED_FORMS];
  void ensureDataFile(seed);
  return seed;
}

async function ensureDataFile(forms: Form[]): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(FORMS_FILE, JSON.stringify(forms, null, 2), "utf-8");
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[forms-store] Could not write forms.json (e.g. read-only FS):", err instanceof Error ? err.message : String(err));
    }
  }
}

async function writeFormsToFile(forms: Form[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FORMS_FILE, JSON.stringify(forms, null, 2), "utf-8");
}

export const formsStore = {
  async getAll(): Promise<Form[]> {
    return readFormsFromFile();
  },

  async getById(id: string): Promise<Form | undefined> {
    const forms = await readFormsFromFile();
    return forms.find((f) => f.id === id);
  },

  async create(input: FormCreateInput): Promise<Form> {
    const forms = await readFormsFromFile();
    const now = new Date().toISOString();
    const form: Form = {
      id: getNextId(forms),
      ...input,
      updatedAt: now,
      createdAt: now,
    };
    const next = [...forms, form];
    await writeFormsToFile(next);
    return form;
  },

  async update(id: string, input: FormCreateInput): Promise<Form | undefined> {
    const forms = await readFormsFromFile();
    const index = forms.findIndex((f) => f.id === id);
    if (index === -1) return undefined;
    const now = new Date().toISOString();
    const updated: Form = {
      ...forms[index],
      ...input,
      updatedAt: now,
    };
    const next = [...forms];
    next[index] = updated;
    await writeFormsToFile(next);
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    const forms = await readFormsFromFile();
    const index = forms.findIndex((f) => f.id === id);
    if (index === -1) return false;
    const next = forms.filter((f) => f.id !== id);
    await writeFormsToFile(next);
    return true;
  },
};
