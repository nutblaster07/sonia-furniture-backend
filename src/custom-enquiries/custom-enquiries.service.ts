import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCustomEnquiryDto } from './dto/create-custom-enquiry.dto.js';
import { UpdateCustomEnquiryStatusDto } from './dto/update-custom-enquiry-status.dto.js';

@Injectable()
export class CustomEnquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCustomEnquiryDto, userId?: string) {
    return this.prisma.customEnquiry.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        furnitureType: dto.furnitureType,
        description: dto.description,
        quantity: dto.quantity,
        materialPreference: dto.materialPreference,
        dimensions: dto.dimensions,
        budget: dto.budget,
        location: dto.location,
        pincode: dto.pincode,
        userId,
      },
    });
  }

  async findAll() {
    return this.prisma.customEnquiry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const enquiry = await this.prisma.customEnquiry.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!enquiry) {
      throw new NotFoundException('Custom enquiry not found');
    }

    return enquiry;
  }

  async updateStatus(
  id: string,
  dto: UpdateCustomEnquiryStatusDto,
) {
  const enquiry = await this.prisma.customEnquiry.findUnique({
    where: { id },
  });

  if (!enquiry) {
    throw new NotFoundException('Custom enquiry not found');
  }

  return this.prisma.customEnquiry.update({
    where: { id },
    data: {
      status: dto.status,
    },
  });
}

}