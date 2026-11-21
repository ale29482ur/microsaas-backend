import {toLowerCase, z} from "zod"

export const LoginUser = z.object({
    email: z.string()
    .trim()
    .transform((email) => email.toLowerCase())
    .email("Informe um email válido !"),

    senha: z.string()
    .min(5, "Sua senha deve conter no mínimo 5 caracteres !")
    .max(120, "Sua senha deve conter menos de 100 caracteres !")
})

