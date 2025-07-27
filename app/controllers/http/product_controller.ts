import { Product } from "../../models/product";
import { Category } from "../../models/category";
import { Request, Response } from "express";
import {
  ProductDeleteSchema,
  ProductStoreSchema,
  ProductUpdateSchema,
} from "../../validators/product";
import { RequestWithValidated } from "../../middlewares/validator";
import { z } from "zod";

export class ProductController {
  async index(req: Request, res: Response) {
    const products = await Product.all();
    const categories = await Category.all();
    res.render("product/index", { products, categories });
  }

  async store(
    req: RequestWithValidated<z.infer<typeof ProductStoreSchema>>,
    res: Response
  ) {
    const data = req.validatedData;
    await Product.create(
      data.name,
      Number(data.quantity),
      Number(data.inventoryId)
    );
    res.redirect("/product");
  }

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await Product.find(id);
    res.render("product/show", { product });
  }

  async delete(
    req: RequestWithValidated<z.infer<typeof ProductDeleteSchema>>,
    res: Response
  ) {
    const data = req.validatedData;
    await Product.delete(data.id);
    res.redirect("/product");
  }

  async update(
    req: RequestWithValidated<z.infer<typeof ProductUpdateSchema>>,
    res: Response
  ) {
    const data = req.validatedData;
    await Product.update(Number(data.id), data.name);
    res.redirect("/product");
  }

  async fromInventory(req: Request, res: Response) {
    const inventoryId = Number(req.params.inventoryId);
    const products = await Product.findByInventory(inventoryId);
    const categories = await Category.findByInventory(inventoryId);
    res.render("product/index", { products, categories, inventoryId });
  }
}
