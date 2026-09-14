import { prisma } from "./db"

// Create
const nova = await prisma.avaliacao.create({
  data: { clienteNome: "Maria", nota: 5, restauranteId: 1 },
})

// Read — todos
const todas = await prisma.avaliacao.findMany()

// Read — um só, por chave única
const uma = await prisma.avaliacao.findUnique({ where: { id: 1 } })

console.log({ nova, todas, uma })

// Update
const atualizada = await prisma.avaliacao.update({
  where: { id: 1 },
  data: { comentario: "Editado após reclamação do cliente" },
})

// Delete
await prisma.avaliacao.delete({ where: { id: 1 } })