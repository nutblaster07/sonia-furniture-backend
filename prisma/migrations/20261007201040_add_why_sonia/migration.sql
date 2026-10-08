-- CreateTable
CREATE TABLE "WhySonia" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhySonia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WhySonia_isActive_idx" ON "WhySonia"("isActive");

-- CreateIndex
CREATE INDEX "WhySonia_sortOrder_idx" ON "WhySonia"("sortOrder");
