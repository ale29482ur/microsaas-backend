import {z} from "zod"

export const ChangeInfosSchema = z.object({
    Novonome: z.string()
    .trim()
    .min(2, "O nome deve conter no mínimo 2 caracteres !")
    .max(30, "O nome deve conter no máximo 30 caracteres !"),

    Novotelefone: z.string()
    .transform((telefone) => telefone.replace(/\D/g, ""))
    .pipe(
        z.string().regex(
            /^\d{10,11}$/,
            "Informe um telefone válido com DDD"
        )
    ),

    Novocargo: z.string()
    .trim
    .min(2, "O cargo deve conter no mínimo 2 caracteres !")
    .max(20, "O cargo deve conter no máximo 20 caracteres !")
})