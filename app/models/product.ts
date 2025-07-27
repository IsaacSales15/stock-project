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

  static async create(name: string, quantity: number, inventoryId: number) {
    return await this.repo.create({ data: { name, quantity, inventoryId } });
  }

  static async delete(id: number) {
    return await this.repo.delete({ where: { id } });
  }

  static async update(id: number, name: string) {
    return await this.repo.update({ where: { id }, data: { name } });
  }

  static async findByInventory(inventoryId: number) {
    return await this.repo.findMany({ where: { inventoryId } });
  }
}
