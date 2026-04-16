-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "urlOriginal" TEXT NOT NULL,
    "urlEncurtada" TEXT NOT NULL,
    "cliques" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_urlEncurtada_key" ON "Link"("urlEncurtada");
