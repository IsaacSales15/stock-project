import { prisma } from "../utils/prisma";

export class Product {
    static async all() { 
        const product = prisma.product
        return await product.findMany() 
    }

    static async find(id: number) { 
        const product = prisma.product
        return await product.findUnique({ where: { id } 
        }) 
    }

    static async create(name: string, quantity: number, inventoryId: number) { 
        const product = prisma.product
        return await product.create({ data: { name, quantity, inventoryId } 
    }) 
}

    static async delete(id: number) { 
        const product = prisma.product
        return await product.delete({ where: { id } 
        }) 
    }

    static async update(id: number, name: string) { 
        const product = prisma.product
        return await product.update({ where: { id }, data: { name } 
        }) 
    }
}