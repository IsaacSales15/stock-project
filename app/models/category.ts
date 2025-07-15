import { prisma } from "../utils/prisma";

export class Category {
/**
 * A repository for category operations.
 * @remarks
 * This property returns a reference to the underlying Prisma `category` model.
 * @returns A reference to the `category` model.
 */

  private static get repo() {
    return prisma.category;
  }

  static async all() {
    return await this.repo.findMany();
  }

  static async find(id: number) {
    return await this.repo.findUnique({ where: { id } });
  }

  static async create(name: string, inventoryId: number) {
    return await this.repo.create({
      data: {
        name,
        updateAt: new Date(),
        Inventory: { connect: { id: inventoryId } },
      },
    });
  }

  static async update(id: number, name: string) {
    return await this.repo.update({
      where: { id },
      data: { name, updateAt: new Date() },
    });
  }

  static async delete(id: number) {
    return await this.repo.delete({ where: { id } });
  }

  static async findByInventory(inventoryId: number) {
    return await this.repo.findMany({ where: { inventoryId } });
  }
}
