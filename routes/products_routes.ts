import { ProductController } from "../app/controllers/http";
import { Router } from "express";

const router = Router();
const productController = new ProductController();

router.get('/', productController.index);
router.get('/:id', productController.show);
router.post('/', productController.store);
router.get('/all', productController.all);            
router.delete('/', productController.delete);          
router.put('/', productController.update);           

export default router;