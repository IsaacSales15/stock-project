import { Product } from "../../models/product";
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
    res.render("product/index", { products });
  }

  async store(
    req: RequestWithValidated<z.infer<typeof ProductStoreSchema>>,
    res: Response
  ) {
    const data = req.validatedData;
    await Product.create(data.name, data.quantity, Number(data.inventoryId));
    res.redirect("/product");
  }

  async show(
    req: RequestWithValidated<z.infer<typeof ProductDeleteSchema>>,
    res: Response
  ) {
    const data = req.validatedData;
    const product = await Product.find(data.id);
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
}
