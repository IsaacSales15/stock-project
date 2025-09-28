import { Response, Request } from "express";
import { Product } from "../../models/product";
import { Category } from "../../models/category";
import { Inventory } from "../../models/inventory";

export class SearchController {
  async search(req: Request, res: Response) {
    const query = req.query.q as string;
    if (!query.trim()) {
      return res.render("search/index", {
        query,
        inventories: [],
        categories: [],
        products: [],
      });
    }

    const products = await Product.findByName({ name: query });
    const categories = await Category.findByName(query);
    const inventories = await Inventory.findByName({ name: query });

    res.render("search/index", { query, inventories, categories, products });
  }
}
