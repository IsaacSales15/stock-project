import { Product } from "../../models/product";
import { Category } from "../../models/category";
import { Request, Response } from "express";
import {
  ProductDeleteSchema,
  ProductStoreSchema,
  ProductUpdateSchema,
  ProductFromCategorySchema,
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
    const { name, quantity, category } = req.validatedData;

    const inventoryId = await Category.getInventoryId(category);
    if (!inventoryId) {
      return res
        .status(400)
        .send("Categoria inválida ou não vinculada a um inventário");
    }

    await Product.create(name, Number(quantity), Number(category), inventoryId);
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
    const product = await Product.find(data.id);
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }

    await Product.update(
      data.id,
      data.name ?? product.name,
      data.quantity ?? product.quantity
    );
    res.redirect(`/product/fromCategory/${product.categoryId}`);
  }

  async fromInventory(req: Request, res: Response) {
    const inventoryId = Number(req.params.inventoryId);
    const products = await Product.findByInventory(inventoryId);
    const categories = await Category.findByInventory(inventoryId);
    res.render("product/index", { products, categories, inventoryId });
  }

  async fromCategory(
    req: RequestWithValidated<z.infer<typeof ProductFromCategorySchema>>,
    res: Response
  ) {
    const { categoryId } = req.validatedData;

    const products = await Product.findByCategory(categoryId);
    const category = await Category.find(categoryId);

    res.render("product/show", { products, category });
  }
}
