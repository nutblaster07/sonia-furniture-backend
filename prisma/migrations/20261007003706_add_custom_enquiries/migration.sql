-- CreateEnum
CREATE TYPE "CustomEnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_PROGRESS', 'QUOTED', 'APPROVED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "CustomEnquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "furnitureType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "materialPreference" TEXT,
    "dimensions" TEXT,
    "budget" DECIMAL(12,2),
    "location" TEXT,
    "pincode" TEXT,
    "status" "CustomEnquiryStatus" NOT NULL DEFAULT 'NEW',
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomEnquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CustomEnquiry_userId_idx" ON "CustomEnquiry"("userId");

-- CreateIndex
CREATE INDEX "CustomEnquiry_status_idx" ON "CustomEnquiry"("status");

-- CreateIndex
CREATE INDEX "CustomEnquiry_createdAt_idx" ON "CustomEnquiry"("createdAt");

-- AddForeignKey
ALTER TABLE "CustomEnquiry" ADD CONSTRAINT "CustomEnquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
