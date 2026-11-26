import { z } from "zod"

export const CreateOrderSchema = z.object({

categoria: z.string()
.trim()
.min(1, "Escreva a categoria do pedido.")
.max(50, "A categoria deve conter até no máximo 50 caracteres."),

modelo: z.string()
.trim()
.min(1, "Escreva o modelo do pedido.")
.max(50, "A categoria deve conter até no máximo 50 caracteres."),

problemainformado: z.string()
.trim()
.min(1, "Escreva o problema informado do pedido.")
.max(50, "A categoria deve conter até no máximo 50 caracteres."),

observacoes: z.string()

.trim()
.min(1, "Escreva a observação do pedido.")
.max(50, "A categoria deve conter até no máximo 50 caracteres."),


nomecliente: z.string()

.trim()
.min(1, "Escreva o nome do cliente.")
.max(50, "A categoria deve conter até no máximo 50 caracteres.")
})