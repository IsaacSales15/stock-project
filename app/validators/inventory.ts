import {z} from "zod";

export const InventoryStoreSchema = z.object({
    name: z.string().max(150, "Nome muito longo").nonempty("Nome obrigatório"),
})

export const InventoryUpdateSchema = z.object({
    id: z.coerce.number().positive("ID inválido"),
    name: z.string().max(150, "Nome muito longo").nonempty("Nome obrigatório"),
})

export const InventoryDeleteSchema = z.object({
    id: z.coerce.number().positive("ID inválido"),
})