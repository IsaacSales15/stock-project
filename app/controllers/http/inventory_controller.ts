import { Request, Response } from "express";
import { Inventory } from "../../models/inventory";
import {
  InventoryUpdateSchema,
  InventoryDeleteSchema,
  InventoryStoreSchema,
} from "../../validators/inventory";
import { z } from "zod";
import { RequestWithValidated } from "../../middlewares/validator";

export class InventoryController {
  async index(req: Request, res: Response) {
    const inventories = await Inventory.all();
    res.render("inventory/index", { inventories });
  }

  async store(
    req: RequestWithValidated<z.infer<typeof InventoryStoreSchema>>,
    res: Response
  ) {
    const data = req.validatedData;
    await Inventory.create(data.name);
    res.redirect("/inventory");
  }

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);
    const inventory = await Inventory.find(id);
    res.render("inventory/index", { inventory });
  }

  async delete(
    req: RequestWithValidated<z.infer<typeof InventoryDeleteSchema>>,
    res: Response
  ) {
    const id = req.validatedData.id;
    await Inventory.delete(id);
    res.redirect("/inventory");
  }

  async update(
    req: RequestWithValidated<z.infer<typeof InventoryUpdateSchema>>,
    res: Response
  ) {
    const { id, name } = req.validatedData;
    await Inventory.update(id, name);
    res.redirect("/inventory");
  }
}
