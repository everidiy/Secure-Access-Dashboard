import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email("Некорректно введена почта!"),
    password: z.string().min(8, "Минимум 8 символов!"),
})

export type AuthFormData = z.infer<typeof authSchema>;