import * as z from "zod";
export const logInSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minium 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const passwordSchema = z.object({
  password: z.string().min(6, {
    message: "Minium 6 characters required",
  }),
});
