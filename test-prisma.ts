import { PrismaClient } from './app/generated/prisma/client/index.js'
const prisma = new PrismaClient()
async function main() {
    const rooms = await prisma.room.findMany()
    console.log("All rooms IDs:", rooms.map((r: any) => r.id))
}
main()
