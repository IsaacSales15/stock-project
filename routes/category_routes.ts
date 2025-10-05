import { Router, Request, Response } from "express";
import { CategoryController } from "../app/controllers/http";
import { validate } from "../app/middlewares/validator";
import {
  CategoryStoreSchema,
  CategoryUpdateSchema,
  CategoryDeleteSchema,
  CategoryFromInventorySchema,
  CategoryAllSchema
} from "../app/validators/category";
import { RequestWithValidated } from "../app/middlewares/validator";
import { z } from "zod";

const router = Router();
const categoryController = new CategoryController();

router.get("/", (req, res) => categoryController.index(req, res));
router.get("/all", (req, res) => categoryController.all(req as RequestWithValidated<z.infer<typeof CategoryAllSchema>>, res));
router.get("/:id", (req, res) => categoryController.show(req, res));

router.get(
  "/fromInventory/:inventoryId",
  validate(CategoryFromInventorySchema, "params"),
  async (req: Request, res: Response) => {
    await categoryController.fromInventory(
      req as RequestWithValidated<z.infer<typeof CategoryFromInventorySchema>>,
      res
    );
  }
);

router.post(
  "/",
  validate(CategoryStoreSchema, "body"),
  (req, res) =>
    categoryController.store(
      req as RequestWithValidated<z.infer<typeof CategoryStoreSchema>>,
      res
    )
);

router.put(
  "/",
  validate(CategoryUpdateSchema, "body"),
  (req, res) =>
    categoryController.update(
      req as RequestWithValidated<z.infer<typeof CategoryUpdateSchema>>,
      res
    )
);

router.delete(
  "/",
  validate(CategoryDeleteSchema, "body"),
  (req, res) =>
    categoryController.delete(
      req as RequestWithValidated<z.infer<typeof CategoryDeleteSchema>>,
      res
    )
);

export default router;
