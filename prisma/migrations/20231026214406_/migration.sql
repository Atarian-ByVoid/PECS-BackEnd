/*
  Warnings:

  - You are about to drop the column `bairro` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `imagemUrl` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `logradouro` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `rg` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `usuario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "usuario_cpf_key";

-- DropIndex
DROP INDEX "usuario_rg_key";

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "bairro",
DROP COLUMN "cidade",
DROP COLUMN "cpf",
DROP COLUMN "genero",
DROP COLUMN "imagemUrl",
DROP COLUMN "logradouro",
DROP COLUMN "rg",
DROP COLUMN "uf";
