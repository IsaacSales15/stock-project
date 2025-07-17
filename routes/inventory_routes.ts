import { Router } from "express";
import { InventoryController } from "../app/controllers/http";
import { validate } from "../app/middlewares/validator";
import {
  InventoryStoreSchema,
  InventoryUpdateSchema,
  InventoryDeleteSchema,
} from "../app/validators/inventory";
import { RequestWithValidated } from "../app/middlewares/validator";
import { z } from "zod";

const router = Router();
const inventoryController = new InventoryController();

router.get("/", inventoryController.index);
router.get("/:id", inventoryController.show);
router.post("/", validate(InventoryStoreSchema, "body"), (req, res) =>
  inventoryController.store(
    req as RequestWithValidated<z.infer<typeof InventoryStoreSchema>>,
    res
  )
);
router.delete("/", validate(InventoryDeleteSchema, "body"), (req, res) =>
  inventoryController.delete(
    req as RequestWithValidated<z.infer<typeof InventoryDeleteSchema>>,
    res
  )
);
router.put("/", validate(InventoryUpdateSchema, "body"), (req, res) =>
  inventoryController.update(
    req as RequestWithValidated<z.infer<typeof InventoryUpdateSchema>>,
    res
  )
);

export default router;
