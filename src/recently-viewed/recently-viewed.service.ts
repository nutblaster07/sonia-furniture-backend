import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class RecentlyViewedService {
  constructor(private readonly prisma: PrismaService) {}

  async add(userId: string, productId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const recentlyViewed = await this.prisma.recentlyViewed.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
      },
    });

    const existingItem =
      await this.prisma.recentlyViewedItem.findUnique({
        where: {
          recentlyViewedId_productId: {
            recentlyViewedId: recentlyViewed.id,
            productId,
          },
        },
      });

    if (existingItem) {
      // If already viewed, update the viewed time
      return this.prisma.recentlyViewedItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          viewedAt: new Date(),
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
    }

    return this.prisma.recentlyViewedItem.create({
      data: {
        recentlyViewedId: recentlyViewed.id,
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
  }

  async findAll(userId: string) {
    const recentlyViewed =
      await this.prisma.recentlyViewed.findUnique({
        where: {
          userId,
        },
        include: {
          items: {
            orderBy: {
              viewedAt: 'desc',
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

    if (!recentlyViewed) {
      return {
        items: [],
      };
    }

    return recentlyViewed;
  }

  async remove(userId: string, productId: string) {
    const recentlyViewed =
      await this.prisma.recentlyViewed.findUnique({
        where: {
          userId,
        },
      });

    if (!recentlyViewed) {
      throw new NotFoundException('Recently viewed list not found');
    }

    const item =
      await this.prisma.recentlyViewedItem.findUnique({
        where: {
          recentlyViewedId_productId: {
            recentlyViewedId: recentlyViewed.id,
            productId,
          },
        },
      });

    if (!item) {
      throw new NotFoundException(
        'Product is not in recently viewed',
      );
    }

    await this.prisma.recentlyViewedItem.delete({
      where: {
        id: item.id,
      },
    });

    return {
      message: 'Product removed from recently viewed',
    };
  }
}