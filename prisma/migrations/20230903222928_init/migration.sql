-- CreateTable
CREATE TABLE "Imagem" (
    "id" SERIAL NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletadoEm" TIMESTAMP(3),
    "chaveBucket" TEXT,
    "uploadEm" TIMESTAMP(3) NOT NULL,
    "pacienteId" INTEGER,

    CONSTRAINT "Imagem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
