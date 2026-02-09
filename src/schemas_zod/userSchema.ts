import { z } from "zod";

export const UserSchema = z.object({
    userName: z.string(),
    email: z.string().email("Некорректно введена почта!"),
    password: z.string().min(8, "Минимум 8 символов!"),
    role: z.enum([ "admin" , "editor" , "viewer"]),
    isActive: z.boolean(),
})

export type UserFormData = z.infer<typeof UserSchema>;