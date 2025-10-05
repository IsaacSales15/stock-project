import { z } from "zod";

export const CategoryStoreSchema = z.object({
  name: z.string().min(1).max(100, "Nome muito longo").nonempty("Nome obrigatório"),
  inventory: z.preprocess((val) => Number(val), z.number().int().positive()),
});

export const CategoryUpdateSchema = z.object({
  id: z.coerce.number().positive("ID inválido"),
  name: z.string().max(100, "Nome muito longo").nonempty("Nome obrigatório"),
  inventoryId: z.string().optional().transform((val) => val ? Number(val) : undefined)
});

export const CategoryDeleteSchema = z.object({
  id: z.coerce.number().positive("ID inválido"),
  inventoryId: z
    .preprocess((val) => (val ? Number(val) : undefined), z.number().int().positive())
    .optional(),
});

export const CategoryShowSchema = z.object({
  id: z.coerce.number().positive("ID inválido"),
});

export const CategoryFromInventorySchema = z.object({
  inventoryId: z.coerce.number().positive("ID inválido"),
});

export const CategoryAllSchema = z.object({
  inventoryId: z.coerce.number().optional(),
  inventoryName: z.string().optional(),
});
