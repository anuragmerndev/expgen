// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
    provider = "prisma-client-js"
}
  
datasource db {
    provider = "postgresql"
    url = env("DATABASE_URL")
}
  
model User {
    id       String @id @default (uuid())
    name     String
    email    String @unique()
    password String
}