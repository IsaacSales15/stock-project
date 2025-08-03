import { ProductController } from "../app/controllers/http";
import { Router } from "express";
import {
  ProductDeleteSchema,
  ProductStoreSchema,
  ProductUpdateSchema,
  ProductFromCategorySchema,
} from "../app/validators/product";
import { RequestWithValidated } from "../app/middlewares/validator";
import { z } from "zod";
import { validate } from "../app/middlewares/validator";

const router = Router();
const productController = new ProductController();

router.get("/", productController.index);
router.get("/fromInventory/:inventoryId", productController.fromInventory);
router.get(
  "/fromCategory/:categoryId",
  validate(ProductFromCategorySchema, "params"),
  (req, res) =>
    void productController.fromCategory(
      req as RequestWithValidated<z.infer<typeof ProductFromCategorySchema>>,
      res
    )
);
router.get("/:id", productController.show);
router.post("/", validate(ProductStoreSchema, "body"), (req, res) =>
  void productController.store(
    req as RequestWithValidated<z.infer<typeof ProductStoreSchema>>,
    res
  )
);
router.delete("/", validate(ProductDeleteSchema, "body"), (req, res) =>
  productController.delete(
    req as RequestWithValidated<z.infer<typeof ProductDeleteSchema>>,
    res
  )
);
router.put("/", validate(ProductUpdateSchema, "body"), (req, res) =>
  productController.update(
    req as RequestWithValidated<z.infer<typeof ProductUpdateSchema>>,
    res
  )
);

export default router;
