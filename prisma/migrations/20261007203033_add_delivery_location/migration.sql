-- CreateTable
CREATE TABLE "DeliveryLocation" (
    "id" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isDeliverable" BOOLEAN NOT NULL DEFAULT true,
    "deliveryCharge" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "estimatedDays" INTEGER NOT NULL DEFAULT 7,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryLocation_pincode_key" ON "DeliveryLocation"("pincode");

-- CreateIndex
CREATE INDEX "DeliveryLocation_isDeliverable_idx" ON "DeliveryLocation"("isDeliverable");

-- CreateIndex
CREATE INDEX "DeliveryLocation_state_idx" ON "DeliveryLocation"("state");
