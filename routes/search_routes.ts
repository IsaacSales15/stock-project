import { SearchController } from "../app/controllers/http";
import { Router } from "express";

const router = Router();
const searchController = new SearchController();

router.get("/", (req, res) => searchController.search(req, res));

export default router;