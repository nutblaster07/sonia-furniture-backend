import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}


  async checkPincode(pincode: string) {
  const location = await this.prisma.deliveryLocation.findUnique({
    where: {
      pincode: pincode.trim(),
    },
  });

  if (!location) {
    return {
      available: false,
      message: 'Delivery is not available for this PIN code',
    };
  }

  return {
    available: location.isDeliverable,
    pincode: location.pincode,
    city: location.city,
    state: location.state,
    deliveryCharge: location.deliveryCharge,
    estimatedDays: location.estimatedDays,
  };
}
async createDeliveryLocation(data: {
  pincode: string;
  city: string;
  state: string;
  isDeliverable?: boolean;
  deliveryCharge?: number;
  estimatedDays?: number;
}) {
  return this.prisma.deliveryLocation.create({
    data: {
      pincode: data.pincode.trim(),
      city: data.city,
      state: data.state,
      isDeliverable: data.isDeliverable ?? true,
      deliveryCharge: data.deliveryCharge ?? 0,
      estimatedDays: data.estimatedDays ?? 7,
    },
  });
}
async findAllDeliveryLocations() {
  return this.prisma.deliveryLocation.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
async updateDeliveryLocation(
  id: string,
  data: {
    pincode?: string;
    city?: string;
    state?: string;
    isDeliverable?: boolean;
    deliveryCharge?: number;
    estimatedDays?: number;
  },
) {
  return this.prisma.deliveryLocation.update({
    where: { id },
    data: {
      ...data,
      pincode: data.pincode?.trim(),
    },
  });
}

async deleteDeliveryLocation(id: string) {
  return this.prisma.deliveryLocation.delete({
    where: { id },
  });
}
}