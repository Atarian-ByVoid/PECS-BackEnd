-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pacienteId_fkey";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "pacienteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
