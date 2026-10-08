import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async add(userId: string, productId: string) {
    // Check whether the product exists
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Find or create the user's wishlist
    const wishlist = await this.prisma.wishlist.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
      },
    });

    // Check whether product is already in wishlist
    const existingItem = await this.prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    if (existingItem) {
      throw new ConflictException('Product already in wishlist');
    }

    const item = await this.prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
      },
      include: {
        product: {
          include: {
            images: {
              orderBy: {
                sortOrder: 'asc',
              },
            },
          },
        },
      },
    });

    return item;
  }

  async findAll(userId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
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

    if (!wishlist) {
      return {
        items: [],
      };
    }

    return wishlist;
  }

  async remove(userId: string, productId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: {
        userId,
      },
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    const item = await this.prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    if (!item) {
      throw new NotFoundException('Product is not in wishlist');
    }

    await this.prisma.wishlistItem.delete({
      where: {
        id: item.id,
      },
    });

    return {
      message: 'Product removed from wishlist',
    };
  }
}