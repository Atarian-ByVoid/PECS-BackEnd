/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Paciente` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `atualizadoEm` to the `Diagnostico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diagnostico" ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletadoEm" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Paciente" DROP COLUMN "deletedAt",
ADD COLUMN     "deletadoEm" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "deletedAt",
ADD COLUMN     "deletadoEm" TIMESTAMP(3);
