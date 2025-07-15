import { CategoryController } from "../app/controllers/http";
import { Router } from "express";

const router = Router();
const categoryController = new CategoryController();

router.get('/', categoryController.index);
router.get('/:id', categoryController.show);
router.post('/', categoryController.store);
router.get('/all', categoryController.all);            
router.delete('/', categoryController.delete);          
router.put('/', categoryController.update);

router.get('/fromInventory/:inventoryId', (req, res, next) => {
  categoryController.fromInventory(req, res);
});


export default router;