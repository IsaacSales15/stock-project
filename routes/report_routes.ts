import { ReportController } from "../app/controllers/http";
import { Router } from "express";

const router = Router();
const reportController = new ReportController();

router.get("/", (req, res) => {
  res.render("report/index"); 
});


router.get("/excel", (req, res) => reportController.excel(res, req));
router.get("/pdf", (req, res) => reportController.pdf(req, res));

export default router;