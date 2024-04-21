import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const client = globalThis.prismaGlobal ?? prismaClientSingleton()

export default client

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = client