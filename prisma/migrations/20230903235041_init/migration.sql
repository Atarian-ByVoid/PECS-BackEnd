/*
  Warnings:

  - You are about to drop the `Diagnostico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Imagem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paciente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Diagnostico" DROP CONSTRAINT "Diagnostico_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "Imagem" DROP CONSTRAINT "Imagem_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "Paciente" DROP CONSTRAINT "Paciente_usuarioId_fkey";

-- DropTable
DROP TABLE "Diagnostico";

-- DropTable
DROP TABLE "Imagem";

-- DropTable
DROP TABLE "Paciente";
