/*
  Warnings:

  - The values [FEMALE,MALE] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('FEMININO', 'MASCULINO');
ALTER TABLE "usuario" ALTER COLUMN "gender" DROP DEFAULT;
ALTER TABLE "usuario" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
ALTER TABLE "usuario" ALTER COLUMN "gender" SET DEFAULT 'FEMININO';
COMMIT;

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "gender" SET DEFAULT 'FEMININO';

-- CreateTable
CREATE TABLE "Relatorio" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "acoesNecessarias" TEXT,
    "outrasAnotacoes" TEXT,
    "pacienteId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Relatorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rotina" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "pacienteId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Rotina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemRotina" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "rotinaId" TEXT NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "ItemRotina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Relatorio" ADD CONSTRAINT "Relatorio_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relatorio" ADD CONSTRAINT "Relatorio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rotina" ADD CONSTRAINT "Rotina_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rotina" ADD CONSTRAINT "Rotina_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemRotina" ADD CONSTRAINT "ItemRotina_rotinaId_fkey" FOREIGN KEY ("rotinaId") REFERENCES "Rotina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
