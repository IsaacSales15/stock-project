import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export class Product {
  /**
   * A repository for product operations.
   * @remarks
   * This property returns a reference to the underlying Prisma `product` model.
   * @returns A reference to the `product` model.
   */
  private static get repo() {
    return prisma.product;
  }

  static async all() {
    return await this.repo.findMany();
  }

  static async find(id: number) {
    return await this.repo.findUnique({ where: { id } });
  }

  static async findByName({ name }: { name: string }) : Promise<Product[]> {
    return await this.repo.findMany({ where: { name }, select: { id: true, name: true, quantity: true, categoryId: true } });
  }

  static async create(
    name: string,
    quantity: number,
    categoryId: number,
    inventoryId: number
  ) {
    return await this.repo.create({
      data: { name, quantity, categoryId, inventoryId },
    });
  }

  static async delete(id: number) {
    return await this.repo.delete({ where: { id } });
  }

  static async update(id: number, name: string, quantity: number) {
    return await this.repo.update({ where: { id }, data: { name, quantity } });
  }

  static async findByInventory(inventoryId: number) {
    return await this.repo.findMany({ where: { inventoryId } });
  }

  static async findByCategory(categoryId: number) {
    return await this.repo.findMany({ where: { categoryId } });
  }

  static async allRelations() {
    return await this.repo.findMany({
      include: {
        category: true,
        inventory: true,
      },
      orderBy: { id: "asc" },
    });
  }
}
