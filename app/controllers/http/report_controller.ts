import ExcelJS from "exceljs";
import { Request, Response } from "express";
import { Product } from "../../models/product.js";
import { Inventory } from "../../models/inventory.js";

export class ReportController {
  async excel(res: Response, req: Request) {
    const inventory = await Inventory.allWithRelations();

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Kaution";

    for (const inv of inventory) {
      const sheet = workbook.addWorksheet(inv.name);

      sheet.columns = [
        { header: "Categoria", key: "category", width: 30 },
        { header: "Produto", key: "product", width: 30 },
        { header: "Quantidade", key: "quantity", width: 15 },
      ];

      for (const category of inv.categories) {
        for (const product of category.products) {
          sheet.addRow({
            category: category.name,
            product: product.name,
            quantity: product.quantity,
          });
        }
      }
    }

    res.setHeader("Content-Disposition", "attachment; filename=relatorio.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.end();
  }
}
