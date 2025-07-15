// routes/inventory_routes.ts
import { Router } from 'express';
import { InventoryController } from '../app/controllers/http';

const router = Router();
const inventoryController = new InventoryController();

router.get('/', inventoryController.index);
router.get('/:id', inventoryController.show);
router.post('/', inventoryController.store);            
router.delete('/', inventoryController.delete);          
router.put('/', inventoryController.update);           

export default router;
