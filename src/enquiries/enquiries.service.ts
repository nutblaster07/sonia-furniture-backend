import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreateEnquiryDto } from './dto/create-enquiry.dto.js';
import { UpdateEnquiryStatusDto } from './dto/update-enquiry-status.dto.js';

@Injectable()
export class EnquiriesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateEnquiryDto,
    userId?: string,
  ) {
    if (dto.productId) {
      const product = await this.prisma.product.findUnique({
        where: {
          id: dto.productId,
        },
      });

      if (!product) {
        throw new NotFoundException(
          'Product not found',
        );
      }
    }

    return this.prisma.enquiry.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        message: dto.message,
        productId: dto.productId,
        userId: userId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            basePrice: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.enquiry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            basePrice: true,
          },
        },
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
  async findByUser(userId: string) {
  return this.prisma.enquiry.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          basePrice: true,
        },
      },
    },
  });
}

  async findOne(enquiryId: string) {
  const enquiry = await this.prisma.enquiry.findUnique({
    where: {
      id: enquiryId,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          basePrice: true,
        },
      },
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
    throw new NotFoundException(
      'Enquiry not found',
    );
  }

  return enquiry;
}

  async updateStatus(
    enquiryId: string,
    dto: UpdateEnquiryStatusDto,
  ) {
    const enquiry = await this.prisma.enquiry.findUnique({
      where: {
        id: enquiryId,
      },
    });

    if (!enquiry) {
      throw new NotFoundException(
        'Enquiry not found',
      );
    }

    return this.prisma.enquiry.update({
      where: {
        id: enquiryId,
      },
      data: {
        status: dto.status,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            basePrice: true,
          },
        },
      },
    });
  }
}