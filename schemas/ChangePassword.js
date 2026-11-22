import { z } from "zod"

export const ChangePasswordSchema = z.object({
    senha: z.string()
    .min(1, "Informe sua senha atual"),

    novasenha: z.string()
    .min(5, "Sua senha deve conter no mínimo 5 caracteres !")
    .max(120, "Sua senha deve conter no máximo 120 caracteres !")
})