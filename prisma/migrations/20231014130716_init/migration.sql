/*
  Warnings:

  - You are about to drop the column `gender` on the `usuario` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('FEMININO', 'MASCULINO');

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "gender",
ADD COLUMN     "genero" "Genero" NOT NULL DEFAULT 'FEMININO';

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "rotina" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "pacienteId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "rotina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_rotina" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "rotinaId" TEXT NOT NULL,

    CONSTRAINT "item_rotina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rotina" ADD CONSTRAINT "rotina_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rotina" ADD CONSTRAINT "rotina_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_rotina" ADD CONSTRAINT "item_rotina_rotinaId_fkey" FOREIGN KEY ("rotinaId") REFERENCES "rotina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
