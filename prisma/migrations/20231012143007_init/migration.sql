/*
  Warnings:

  - Changed the type of `tipo` on the `Relatorio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoRelatorio" AS ENUM ('ACOMPANHAMENTO_DIARIO', 'TRATAMENTO', 'COMPORTAMENTO', 'NUTRICAO', 'ATIVIDADES_FISICAS', 'SONO', 'EVENTOS_ESPECIFICOS', 'COMUNICACAO', 'EDUCACAO', 'COMUNICACAO_FAMILIAR', 'OUTROS');

-- AlterTable
ALTER TABLE "Relatorio" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoRelatorio" NOT NULL;
