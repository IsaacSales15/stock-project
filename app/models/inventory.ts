import { prisma } from "../utils/prisma";

export class Inventory {
    static async all() { return await prisma.inventory.findMany() }
    static async find(id: number) { return await prisma.inventory.findUnique({ where: { id } }) }
    static async create(name: string) { return await prisma.inventory.create({ data: { name } }) }
    static async delete(id: number) { return await prisma.inventory.delete({ where: { id } }) }
    static async update(id: number, name: string) { return await prisma.inventory.update({ where: { id }, data: { name } }) }
}