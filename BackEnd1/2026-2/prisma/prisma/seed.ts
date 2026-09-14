// prisma/seed.ts
import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.restaurante.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nome: "Cantina da Praça",
      endereco: "Rua Central, 100",
    },
  })
}

main()