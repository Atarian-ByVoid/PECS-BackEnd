/*
  Warnings:

  - The primary key for the `Diagnostico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Paciente` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Diagnostico" DROP CONSTRAINT "Diagnostico_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pacienteId_fkey";

-- AlterTable
ALTER TABLE "Diagnostico" DROP CONSTRAINT "Diagnostico_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "pacienteId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Diagnostico_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Diagnostico_id_seq";

-- AlterTable
ALTER TABLE "Paciente" DROP CONSTRAINT "Paciente_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Paciente_id_seq";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "pacienteId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnostico" ADD CONSTRAINT "Diagnostico_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
