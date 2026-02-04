import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  fieldsCount: z
    .number()
    .int("Must be an integer")
    .min(0, "Min 0")
    .max(50, "Max 50"),
  status: z.enum(["draft", "active", "archived"], {
    message: "Select a status",
  }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  role: z.enum(["Individual", "Admin"], {
    message: "Select a role",
  }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
