-- CreateTable
CREATE TABLE "CustomFurnitureBanner" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "imageUrl" TEXT NOT NULL,
    "buttonText" TEXT,
    "buttonLink" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomFurnitureBanner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CustomFurnitureBanner_isActive_idx" ON "CustomFurnitureBanner"("isActive");

-- CreateIndex
CREATE INDEX "CustomFurnitureBanner_sortOrder_idx" ON "CustomFurnitureBanner"("sortOrder");
