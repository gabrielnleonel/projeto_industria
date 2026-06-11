-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfil" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaPrima" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "estoque_m3" DOUBLE PRECISION NOT NULL,
    "custo_m3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MateriaPrima_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdemCorte" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "materiaPrimaId" INTEGER NOT NULL,
    "volumeInicial" DOUBLE PRECISION NOT NULL,
    "volumeFinal" DOUBLE PRECISION NOT NULL,
    "rendimento" DOUBLE PRECISION NOT NULL,
    "justificativa" TEXT,

    CONSTRAINT "OrdemCorte_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "OrdemCorte" ADD CONSTRAINT "OrdemCorte_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemCorte" ADD CONSTRAINT "OrdemCorte_materiaPrimaId_fkey" FOREIGN KEY ("materiaPrimaId") REFERENCES "MateriaPrima"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
