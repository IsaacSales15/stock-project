import { z } from "zod";

export const ProductStoreSchema = z.object({
    name: z.string().min(1).max(100, "Nome muito longo").nonempty("Nome obrigatório"),
    price: z.preprocess((val) => Number(val), z.number().positive("Preço inválido")),
    category: z.coerce.number().positive("Categoria inválida"),
    inventoryId: z.coerce.number().positive("Estoque inválido"),
    quantity: z.preprocess((val) => Number(val), z.number().positive("Quantidade inválida")),
});

export const ProductUpdateSchema = z.object({
    id: z.coerce.number().positive("ID inválido"),
    name: z.string().max(100, "Nome muito longo").nonempty("Nome obrigatório"),
    price: z.preprocess((val) => Number(val), z.number().positive("Preço inválido")),
})

export const ProductDeleteSchema = z.object({
    id: z.coerce.number().positive("ID inválido"),
})


