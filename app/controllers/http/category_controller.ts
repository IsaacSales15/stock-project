import { Category } from "../../models/category";
import { Request, Response } from "express";
import {
  CategoryDeleteSchema,
  CategoryFromInventorySchema,
  CategoryShowSchema,
  CategoryStoreSchema,
  CategoryUpdateSchema,
} from "../../validators/category";

export class CategoryController {
  async index(req: Request, res: Response) {
    const categories = await Category.all();
    res.render("category/index", { categories });
  }

  async show(req: Request, res: Response) {
    const data = CategoryShowSchema.parse(Number(req.params.id));
    const category = await Category.find(data.id);
    res.render("category/show", { category });
  }

  async store(req: Request, res: Response) {
    const data = CategoryStoreSchema.parse(req.body);
    await Category.create(data.name, Number(data.inventory));
    res.redirect("/category");
  }

  async update(req: Request, res: Response) {
    const data = CategoryUpdateSchema.parse(req.body);
    await Category.update(Number(data.id), data.name);
    res.redirect("/category");
  }

  async delete(req: Request, res: Response) {
    const data = CategoryDeleteSchema.parse(req.body);
    await Category.delete(data.id);
    res.redirect("/category");
  }

  async all(req: Request, res: Response) {
    const categories = await Category.all();
    res.render("category/index", { categories });
  }

  async fromInventory(req: Request, res: Response) {
    const data = CategoryFromInventorySchema.parse(req.body);
    const categories = await Category.findByInventory(data.inventoryId as number);
    res.render("category/from_inventory", { categories, data: data.inventoryId });
  }
}
