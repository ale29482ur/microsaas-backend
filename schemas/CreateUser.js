import { z } from "zod"

export const CreateUserSchema = z.object({
    nome: z.string()
    .trim()
    .min(2, "O nome deve conter no mínimo 2 caracteres !")
    .max(30, "O nome deve conter no máximo 30 caracteres !"),
    
    telefone: z.string()
    .transform((telefone) => telefone.replace(/\D/g, ""))
    .pipe(
        z.string().regex(
            /^\d{10,11}$/,
            "Informe um telefone válido com DDD"
        )
    ),
    
    cargo: z.string()
    .trim()
    .min(2, "O cargo deve conter no mínimo 2 caracteres !")
    .max(20, "O cargo deve conter no máximo 20 caracteres !"),

    email: z.string()
    .trim()
    .email("Informe um email válido."),
    
    senha: z.string()
    .trim()
    .min(5, "Sua senha deve conter no mínimo 5 caracteres !")
    .max(120, "Sua senha deve conter menos de 100 caracteres !")
})