import { prisma } from "./db"

const restaurantes = await prisma.restaurante.findMany()
console.log(restaurantes)