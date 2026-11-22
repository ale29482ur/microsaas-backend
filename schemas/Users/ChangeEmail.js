import { toLowerCase, z } from "zod"

export const ChangeEmailSchema = z.object({
    novoEmail: z.string()
    .trim()
    .email("Informe um email válido.")
    .transform((novoEmail) => email.toLowerCase() ),
    
    senha: z.string()
    .min(1, "Informe sua senha.")
    .max(120, "Sua senha deve conter no máximo 120 caracteres !")

})