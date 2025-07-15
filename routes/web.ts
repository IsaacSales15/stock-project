import { Express } from "express";
import inventory_routes from "./inventory_routes";
import product_routes from "./products_routes";
import category_routes from "./category_routes";

export default function routes(app: Express){
    app.get('/', (req, res) => {
        res.render('inventory/index'); 
    });

    app.use('/inventory', inventory_routes);
    app.use('/product', product_routes);
    app.use('/category', category_routes);
}