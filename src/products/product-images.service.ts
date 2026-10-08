import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductImageDto } from './dto/create-product-image.dto.js';

@Injectable()
export class ProductImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    productId: string,
    createProductImageDto: CreateProductImageDto,
  ) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.productImage.create({
      data: {
        ...createProductImageDto,
        productId,
      },
    });
  }

  async findAll(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.productImage.findMany({
      where: {
        productId,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async remove(productId: string, imageId: string) {
  const image = await this.prisma.productImage.findFirst({
    where: {
      id: imageId,
      productId,
    },
  });

  if (!image) {
    throw new NotFoundException('Product image not found');
  }

  return this.prisma.productImage.delete({
    where: {
      id: imageId,
    },
  });
}

}