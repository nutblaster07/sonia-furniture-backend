-- CreateTable
CREATE TABLE "Compare" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Compare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompareItem" (
    "id" TEXT NOT NULL,
    "compareId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompareItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Compare_userId_key" ON "Compare"("userId");

-- CreateIndex
CREATE INDEX "CompareItem_compareId_idx" ON "CompareItem"("compareId");

-- CreateIndex
CREATE INDEX "CompareItem_productId_idx" ON "CompareItem"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "CompareItem_compareId_productId_key" ON "CompareItem"("compareId", "productId");

-- AddForeignKey
ALTER TABLE "Compare" ADD CONSTRAINT "Compare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompareItem" ADD CONSTRAINT "CompareItem_compareId_fkey" FOREIGN KEY ("compareId") REFERENCES "Compare"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompareItem" ADD CONSTRAINT "CompareItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
