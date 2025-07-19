import { Request, Response } from "express";
import { Category } from "../../models/category";
import { RequestWithValidated } from "../../middlewares/validator";
import {
  CategoryStoreSchema,
  CategoryUpdateSchema,
  CategoryDeleteSchema,
  CategoryFromInventorySchema,
} from "../../validators/category";
import { z } from "zod";

export class CategoryController {
  async index(req: Request, res: Response) {
    const categories = await Category.all();
    res.render("category/index", { categories });
  }

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);
    const category = await Category.find(id);
    res.render("category/show", { category });
  }

  async store(
    req: RequestWithValidated<z.infer<typeof CategoryStoreSchema>>,
    res: Response
  ) {
    const { name, inventory } = req.validatedData;
    await Category.create(name, inventory);
    // Quero deixar registrado que passei 10 minutos procurando o erro, pra no final
    // o erro ser que eu confundi um `` com um ''. Faz o L ai.
    res.redirect(`/category/fromInventory/${inventory}`);
  }

  async update(
    req: RequestWithValidated<z.infer<typeof CategoryUpdateSchema>>,
    res: Response
  ) {
    const { id, name } = req.validatedData;
    await Category.update(id, name);
    res.redirect("/category");
  }

  async delete(
    req: RequestWithValidated<z.infer<typeof CategoryDeleteSchema>>,
    res: Response
  ) {
    const { id } = req.validatedData;
    await Category.delete(id);
    res.redirect("/category");
  }

  async all(req: Request, res: Response) {
    const categories = await Category.all();
    res.render("category/index", { categories });
  }

  async fromInventory(
    req: RequestWithValidated<z.infer<typeof CategoryFromInventorySchema>>,
    res: Response
  ) {
    const { inventoryId } = req.validatedData;
    const categories = await Category.findByInventory(inventoryId);
    res.render("category/from_inventory", { categories, inventoryId });
  }
}
