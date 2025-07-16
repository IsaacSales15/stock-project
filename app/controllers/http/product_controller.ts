import { Product } from "../../models/product";
import { Request, Response } from "express";

export class ProductController {
  async index(req: Request, res: Response) {
    const products = await Product.all();
    res.render("product/index", { products });
  }

  async store(req: Request, res: Response) {
    const { name, quantity, inventoryId } = req.body;
    await Product.create(name, quantity, Number(inventoryId));
    res.redirect("/product");
  }

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await Product.find(id);
    res.render("product/show", { product });
  }

  async all(req: Request, res: Response) {
    const products = await Product.all();
    res.render("product/index", { products });
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.body.id);
    await Product.delete(id);
    res.redirect("/product");
  }

  async update(req: Request, res: Response) {
    const { id, name } = req.body;
    await Product.update(Number(id), name);
    res.redirect("/product");
  }
}
