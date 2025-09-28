import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export class Inventory {
  /**
   * A repository for inventory operations.
   * @remarks
   * This property returns a reference to the underlying Prisma `inventory` model.
   * @returns A reference to the `inventory` model.
   */
  private static get repo() {
    return prisma.inventory;
  }

  static async all() {
    return await this.repo.findMany();
  }
  static async find(id: number) {
    return await this.repo.findUnique({ where: { id } });
  }
  static async findByName({ name }: { name: string }) : Promise<Inventory[]> {
    return await this.repo.findMany({ where: { name } });
  }
  static async create(name: string) {
    return await this.repo.create({ data: { name } });
  }
  static async delete(id: number) {
    return await this.repo.delete({ where: { id } });
  }
  static async update(id: number, name: string) {
    return await this.repo.update({
      where: { id: Number(id) },
      data: { name },
    });
  }

  static async allWithRelations() {
    return await this.repo.findMany({
      include: {
        categories: {
          include: { products: true },
        },
      },
    });
  }
}
