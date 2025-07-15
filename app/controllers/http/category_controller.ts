import { Category } from "../../models/category";
import { Request, Response } from "express";

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

  async store(req: Request, res: Response) {
    const { name, inventory } = req.body;
    await Category.create(name, inventory);
    res.redirect("/category");
  }

  async update(req: Request, res: Response) {
    const { id, name } = req.body;
    await Category.update(id, name);
    res.redirect("/category");
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.body.id);
    await Category.delete(id);
    res.redirect("/category");
  }

  async all(req: Request, res: Response) {
    const categories = await Category.all();
    res.render("category/index", { categories });
  }

  async fromInventory(req: Request, res: Response) {
    const inventoryId = Number(req.params.inventoryId);
    if (isNaN(inventoryId)) return res.status(400).send("ID inválido");

    const categories = await Category.findByInventory(inventoryId);
    res.render("category/from_inventory", { categories, inventoryId });
  }
}
