-- CreateTable
CREATE TABLE "RecentlyViewed" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecentlyViewed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecentlyViewedItem" (
    "id" TEXT NOT NULL,
    "recentlyViewedId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecentlyViewedItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecentlyViewed_userId_key" ON "RecentlyViewed"("userId");

-- CreateIndex
CREATE INDEX "RecentlyViewedItem_recentlyViewedId_idx" ON "RecentlyViewedItem"("recentlyViewedId");

-- CreateIndex
CREATE INDEX "RecentlyViewedItem_productId_idx" ON "RecentlyViewedItem"("productId");

-- CreateIndex
CREATE INDEX "RecentlyViewedItem_viewedAt_idx" ON "RecentlyViewedItem"("viewedAt");

-- CreateIndex
CREATE UNIQUE INDEX "RecentlyViewedItem_recentlyViewedId_productId_key" ON "RecentlyViewedItem"("recentlyViewedId", "productId");

-- AddForeignKey
ALTER TABLE "RecentlyViewed" ADD CONSTRAINT "RecentlyViewed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentlyViewedItem" ADD CONSTRAINT "RecentlyViewedItem_recentlyViewedId_fkey" FOREIGN KEY ("recentlyViewedId") REFERENCES "RecentlyViewed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentlyViewedItem" ADD CONSTRAINT "RecentlyViewedItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
