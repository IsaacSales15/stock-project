import { Express } from "express";
import inventory_routes from "./inventory_routes";
import product_routes from "./products_routes";
import category_routes from "./category_routes";
import report_routes from "./report_routes";
import { InventoryController } from "../app/controllers/http";
import search_routes from "./search_routes";

export default function routes(app: Express){

    const inventoryController = new InventoryController();

    app.get('/', (req, res) => inventoryController.index(req, res));

    app.use('/inventory', inventory_routes);
    app.use('/product', product_routes);
    app.use('/category', category_routes);
    app.use('/report', report_routes);
    app.use('/search', search_routes);
}