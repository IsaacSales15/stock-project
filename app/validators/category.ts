import { z } from "zod";

export const CategoryStoreSchema = z.object({
    name: z.string().max(150, "Nome muito longo").nonempty("Nome obrigatório"),
    inventory: z.coerce.number().positive("ID inválido"),
})

export const CategoryUpdateSchema = z.object({
    id: z.coerce.number().positive("ID inválido"),
    name: z.string().max(150, "Nome muito longo").nonempty("Nome obrigatório"),
})

export const CategoryDeleteSchema = z.object({
    id: z.coerce.number().positive("ID inválido"),
})

export const CategoryShowSchema = z.object({
    id: z.coerce.number().positive("ID inválido"),
})

export const CategoryFromInventorySchema = z.object({
    inventoryId: z.coerce.number().positive("ID inválido"),
})