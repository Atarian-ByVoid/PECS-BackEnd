/*
  Warnings:

  - You are about to drop the `ItemRotina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Relatorio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rotina` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemRotina" DROP CONSTRAINT "ItemRotina_rotinaId_fkey";

-- DropForeignKey
ALTER TABLE "Relatorio" DROP CONSTRAINT "Relatorio_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "Relatorio" DROP CONSTRAINT "Relatorio_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Rotina" DROP CONSTRAINT "Rotina_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "Rotina" DROP CONSTRAINT "Rotina_usuarioId_fkey";

-- DropTable
DROP TABLE "ItemRotina";

-- DropTable
DROP TABLE "Relatorio";

-- DropTable
DROP TABLE "Rotina";

-- CreateTable
CREATE TABLE "relatorio" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "tipo" "TipoRelatorio" NOT NULL,
    "descricao" TEXT NOT NULL,
    "acoesNecessarias" TEXT,
    "outrasAnotacoes" TEXT,
    "pacienteId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "relatorio_pkey" PRIMARY KEY ("id")
);

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
    "rotinaId" TEXT NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "item_rotina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "relatorio" ADD CONSTRAINT "relatorio_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio" ADD CONSTRAINT "relatorio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rotina" ADD CONSTRAINT "rotina_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rotina" ADD CONSTRAINT "rotina_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_rotina" ADD CONSTRAINT "item_rotina_rotinaId_fkey" FOREIGN KEY ("rotinaId") REFERENCES "rotina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
