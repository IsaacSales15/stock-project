import { Request, Response } from "express";
import { Inventory } from "../../models/inventory";
import { InventoryUpdateSchema, InventoryDeleteSchema, InventoryStoreSchema } from "../../validators/inventory";

export class InventoryController {
  async index(req: Request, res: Response) {
    const inventories = await Inventory.all();
    res.render("inventory/index", { inventories });
  }

  async store(req: Request, res: Response) {
    const data = InventoryStoreSchema.parse(req.body);
    await Inventory.create(data.name);
    res.redirect("/inventory");
  }

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);
    const inventory = await Inventory.find(id);
    res.render("inventory/show", { inventory });
  }

  async delete(req: Request, res: Response) {
    const data = InventoryDeleteSchema.parse(Number(req.body.id));
    await Inventory.delete(data.id);
    res.redirect("/inventory");
  }

  async update(req: Request, res: Response) {
    const data = InventoryUpdateSchema.parse(req.body);
    await Inventory.update(data.id, data.name);
    res.redirect("/inventory");
  }
}
