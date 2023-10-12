/*
  Warnings:

  - You are about to drop the `item_rotina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rotina` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "item_rotina" DROP CONSTRAINT "item_rotina_rotinaId_fkey";

-- DropForeignKey
ALTER TABLE "rotina" DROP CONSTRAINT "rotina_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "rotina" DROP CONSTRAINT "rotina_usuarioId_fkey";

-- AlterTable
ALTER TABLE "relatorio" ADD COLUMN     "deletadoEm" TIMESTAMP(3);

-- DropTable
DROP TABLE "item_rotina";

-- DropTable
DROP TABLE "rotina";
