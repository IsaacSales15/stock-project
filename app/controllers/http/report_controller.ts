import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { Request, Response } from "express";
import { Inventory } from "../../models/inventory";

export class ReportController {
  async excel(res: Response, req: Request) {
    const inventory = await Inventory.allWithRelations();

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Kaution";

    for (const inv of inventory) {
      const sheet = workbook.addWorksheet(inv.name);

      sheet.columns = [
        { header: "Inventário", key: "inventory", width: 30 },
        { header: "Categoria", key: "category", width: 30 },
        { header: "Produto", key: "product", width: 30 },
        { header: "Quantidade", key: "quantity", width: 15 },
      ];

      for (const category of inv.categories) {
        for (const product of category.products) {
          sheet.addRow({
            inventory: inv.name,
            category: category.name,
            product: product.name,
            quantity: product.quantity,
          });
        }
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader("Content-Disposition", "attachment; filename=relatorio.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  }

  async pdf(req: Request, res: Response) {
    try {
      const inventory = await Inventory.allWithRelations();

      res.setHeader("Content-Disposition", "attachment; filename=relatorio.pdf");
      res.setHeader("Content-Type", "application/pdf");

      const doc = new PDFDocument();
      doc.pipe(res);

      doc.fontSize(20).text("Relatório de Inventário", { align: "center" });
      doc.moveDown(2);

      for (const inv of inventory) {
        doc.fontSize(16).text(`Inventário: ${inv.name}`, { underline: true });
        doc.moveDown(0.5);

        for (const category of inv.categories) {
          doc.fontSize(14).text(`Categoria: ${category.name}`, { indent: 20 });
          doc.moveDown(0.3);

          for (const product of category.products) {
            doc
              .fontSize(12)
              .text(
                `Produto: ${product.name} | Quantidade: ${product.quantity}`,
                { indent: 40 }
              );
          }

          doc.moveDown(1);
        }

        doc.addPage(); 
      }

      doc.end();
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao gerar PDF");
    }
  }
}