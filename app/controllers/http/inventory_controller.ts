import { Request, Response } from "express";
import { Inventory } from "../../models/inventory";

export class InventoryController {
  async index(req: Request, res: Response) {
    const inventories = await Inventory.all();
    res.render("inventory/index", { inventories });
  }

  async store(req: Request, res: Response) {
    const { name, description } = req.body;
    await Inventory.create(name);
    res.redirect("/inventory");
  }

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);
    const inventory = await Inventory.find(id);
    res.render("inventory/show", { inventory });
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.body.id);
    await Inventory.delete(id);
    res.redirect("/inventory");
  }

  async update(req: Request, res: Response) {
    const { id, name } = req.body;
    await Inventory.update(id, name);
    res.redirect("/inventory");
  }
}
