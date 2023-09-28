/*
  Warnings:

  - Added the required column `pacienteId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "imagemUrl" TEXT,
ADD COLUMN     "pacienteId" INTEGER NOT NULL,
ALTER COLUMN "dataNascimento" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletadoEm" TIMESTAMP(3),
    "dataNascimento" DATE,
    "nome" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnostico" (
    "id" SERIAL NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletadoEm" TIMESTAMP(3),
    "dataDiagnostico" TIMESTAMP(3) NOT NULL,
    "tratamento" TEXT,
    "subtipoTEA" "SubtipoTEA" NOT NULL,
    "gravidadeTEA" "GravidadeTEA" NOT NULL,
    "pacienteId" INTEGER,

    CONSTRAINT "Diagnostico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_documento_key" ON "Paciente"("documento");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnostico" ADD CONSTRAINT "Diagnostico_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
