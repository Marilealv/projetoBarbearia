import { PrismaClient } from "@prisma/client";

declare global {
    var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma; 
}

export const db = prisma;

//previne que não abra nova conexão com o banco, garante sempre apenas 1
//prisma client inicializado