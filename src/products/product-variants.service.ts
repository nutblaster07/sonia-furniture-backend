import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductVariantDto } from './dto/create-product-variant.dto.js';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto.js';

@Injectable()
export class ProductVariantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    productId: string,
    createProductVariantDto: CreateProductVariantDto,
  ) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.productVariant.create({
      data: {
        ...createProductVariantDto,
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

  return this.prisma.productVariant.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}

async update(
  productId: string,
  variantId: string,
  updateProductVariantDto: UpdateProductVariantDto,
) {
  const variant = await this.prisma.productVariant.findFirst({
    where: {
      id: variantId,
      productId,
    },
  });

  if (!variant) {
    throw new NotFoundException('Product variant not found');
  }

  return this.prisma.productVariant.update({
    where: {
      id: variantId,
    },
    data: updateProductVariantDto,
  });
}

async remove(productId: string, variantId: string) {
  const variant = await this.prisma.productVariant.findFirst({
    where: {
      id: variantId,
      productId,
    },
  });

  if (!variant) {
    throw new NotFoundException('Product variant not found');
  }

  return this.prisma.productVariant.delete({
    where: {
      id: variantId,
    },
  });
}



}