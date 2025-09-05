import { z } from "zod";

export const ProductStoreSchema = z.object({
  name: z.string().min(1),
  quantity: z.preprocess((val) => Number(val), z.number().int().positive()),
  inventoryId: z
    .preprocess(
      (val) => (val === undefined ? undefined : Number(val)),
      z.number().int().positive()
    )
    .optional(),
  category: z.preprocess((val) => Number(val), z.number().int().positive()),
});

export const ProductUpdateSchema = z.object({
  id: z.coerce.number().positive("ID inválido"),
  name: z.string().max(100, "Nome muito longo").optional(),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().positive("Quantidade inválida").optional()
  ),
});

export const ProductDeleteSchema = z.object({
  id: z.coerce.number().positive("ID inválido"),
});

export const ProductShowSchema = z.object({
  id: z.coerce.number().positive("ID inválido"),
});

export const ProductFromInventorySchema = z.object({
  inventoryId: z.coerce.number().positive("ID inválido"),
});

export const ProductFromCategorySchema = z.object({
  categoryId: z.coerce.number().positive("ID inválido"),
});

