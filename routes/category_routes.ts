import { Router } from "express";
import { CategoryController } from "../app/controllers/http";
import { validate } from "../app/middlewares/validator";
import {
  CategoryStoreSchema,
  CategoryUpdateSchema,
  CategoryDeleteSchema,
  CategoryFromInventorySchema,
} from "../app/validators/category";
import { RequestWithValidated } from "../app/middlewares/validator";
import { z } from "zod";

const router = Router();
const controller = new CategoryController();

router.get("/", controller.index);
router.get("/all", controller.all);
router.get("/:id", controller.show);
router.get(
  "/fromInventory/:inventoryId",
  validate(CategoryFromInventorySchema),
  (req, res) =>
    controller.fromInventory(
      req as RequestWithValidated<z.infer<typeof CategoryFromInventorySchema>>,
      res
    )
);

router.post(
  "/",
  validate(CategoryStoreSchema),
  (req, res) =>
    controller.store(
      req as RequestWithValidated<z.infer<typeof CategoryStoreSchema>>,
      res
    )
);

router.put(
  "/",
  validate(CategoryUpdateSchema),
  (req, res) =>
    controller.update(
      req as RequestWithValidated<z.infer<typeof CategoryUpdateSchema>>,
      res
    )
);

router.delete(
  "/",
  validate(CategoryDeleteSchema),
  (req, res) =>
    controller.delete(
      req as RequestWithValidated<z.infer<typeof CategoryDeleteSchema>>,
      res
    )
);

export default router;
