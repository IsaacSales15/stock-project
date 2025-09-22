import { ReportController } from "../app/controllers/http";
import { Router } from "express";

const router = Router();
const reportController = new ReportController();

router.get("/excel", (req, res) => void reportController.excel(res, req));

export default router;