import { Router } from 'express';
import { InventoryController } from '../app/controllers/http';

const router = Router();
const inventoryController = new InventoryController();

router.get('/', inventoryController.index);
router.get('/inventory', inventoryController.index);
router.post('/inventory', inventoryController.store);
router.delete('/inventory', inventoryController.delete);
router.put('/inventory', inventoryController.update);

export default router;