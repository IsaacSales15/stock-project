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
const categoryController = new CategoryController();

router.get("/", categoryController.index);
router.get("/all", categoryController.all);
router.get("/:id", categoryController.show);
router.get(
  "/fromInventory/:inventoryId",
  validate(CategoryFromInventorySchema, 'params'),
  (req, res) =>
    categoryController.fromInventory(
      req as RequestWithValidated<z.infer<typeof CategoryFromInventorySchema>>,
      res
    )
);

router.post(
  "/",
  validate(CategoryStoreSchema, 'body'),
  (req, res) =>
    categoryController.store(
      req as RequestWithValidated<z.infer<typeof CategoryStoreSchema>>,
      res
    )
);

router.put(
  "/",
  validate(CategoryUpdateSchema, 'body'),
  (req, res) =>
    categoryController.update(
      req as RequestWithValidated<z.infer<typeof CategoryUpdateSchema>>,
      res
    )
);

router.delete(
  "/",
  validate(CategoryDeleteSchema, 'body'),
  (req, res) =>
    categoryController.delete(
      req as RequestWithValidated<z.infer<typeof CategoryDeleteSchema>>,
      res
    )
);

export default router;
