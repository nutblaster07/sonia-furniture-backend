import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CompareService {
  private readonly MAX_COMPARE_PRODUCTS = 4;

  constructor(private readonly prisma: PrismaService) {}

  async add(userId: string, productId: string) {
    // 1. Check whether the product exists
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // 2. Find or create the user's compare list
    const compare = await this.prisma.compare.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
      },
    });

    // 3. Check whether the product is already being compared
    const existingItem = await this.prisma.compareItem.findUnique({
      where: {
        compareId_productId: {
          compareId: compare.id,
          productId,
        },
      },
    });

    if (existingItem) {
      throw new ConflictException(
        'Product already exists in comparison',
      );
    }

    // 4. Check maximum comparison limit
    const itemCount = await this.prisma.compareItem.count({
      where: {
        compareId: compare.id,
      },
    });

    if (itemCount >= this.MAX_COMPARE_PRODUCTS) {
      throw new ConflictException(
        `You can compare a maximum of ${this.MAX_COMPARE_PRODUCTS} products`,
      );
    }

    // 5. Add product
    return this.prisma.compareItem.create({
      data: {
        compareId: compare.id,
        productId,
      },
      include: {
        product: {
          include: {
            category: true,
            images: {
              orderBy: {
                sortOrder: 'asc',
              },
            },
            variants: {
              where: {
                isActive: true,
              },
              orderBy: {
                price: 'asc',
              },
            },
          },
        },
      },
    });
  }

  async findAll(userId: string) {
    const compare = await this.prisma.compare.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            product: {
              include: {
                category: true,
                images: {
                  orderBy: {
                    sortOrder: 'asc',
                  },
                },
                variants: {
                  where: {
                    isActive: true,
                  },
                  orderBy: {
                    price: 'asc',
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!compare) {
      return {
        items: [],
      };
    }

    return compare;
  }

  async remove(userId: string, productId: string) {
    const compare = await this.prisma.compare.findUnique({
      where: {
        userId,
      },
    });

    if (!compare) {
      throw new NotFoundException('Compare list not found');
    }

    const item = await this.prisma.compareItem.findUnique({
      where: {
        compareId_productId: {
          compareId: compare.id,
          productId,
        },
      },
    });

    if (!item) {
      throw new NotFoundException(
        'Product is not in comparison',
      );
    }

    await this.prisma.compareItem.delete({
      where: {
        id: item.id,
      },
    });

    return {
      message: 'Product removed from comparison',
    };
  }
}