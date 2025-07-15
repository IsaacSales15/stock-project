import { prisma } from "../utils/prisma";

export class Inventory {

    static async all() { 
        const inventory = prisma.inventory
        return await inventory.findMany() 
    }
    static async find(id: number) { 
        const inventory = prisma.inventory
        return await inventory.findUnique({ where: { id } 
        }) 
    }
    static async create(name: string) { 
        const inventory = prisma.inventory
        return await inventory.create({ data: { name } 
        }) 
    }
    static async delete(id: number) { 
        const inventory = prisma.inventory
        return await inventory.delete({ where: { id } 
        }) 
    }
    static async update(id: number, name: string) { 
        const inventory = prisma.inventory
        return await inventory.update({ where: { id }, data: { name } 
        }) 
    }
}