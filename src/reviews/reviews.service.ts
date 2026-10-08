import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { UpdateReviewApprovalDto } from './dto/update-review-approval.dto.js';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReviewDto, userId: string) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: {
        id: dto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check if this user already reviewed this product
    const existingReview = await this.prisma.review.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: dto.productId,
        },
      },
    });

    if (existingReview) {
      throw new ConflictException(
        'You have already reviewed this product',
      );
    }

    return this.prisma.review.create({
      data: {
        rating: dto.rating,
        title: dto.title,
        comment: dto.comment,
        userId,
        productId: dto.productId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }
  async findByProduct(productId: string) {
  const product = await this.prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  const reviews = await this.prisma.review.findMany({
    where: {
      productId,
      isApproved: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        totalReviews
      : 0;

  return {
    totalReviews,
    averageRating: Number(averageRating.toFixed(1)),
    reviews,
  };
}
async update(
  reviewId: string,
  dto: UpdateReviewDto,
  userId: string,
) {
  const review = await this.prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new NotFoundException('Review not found');
  }

  if (review.userId !== userId) {
    throw new ConflictException(
      'You can only edit your own review',
    );
  }

  return this.prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      rating: dto.rating,
      title: dto.title,
      comment: dto.comment,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}
async remove(reviewId: string, userId: string) {
  const review = await this.prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new NotFoundException('Review not found');
  }

  if (review.userId !== userId) {
    throw new ConflictException(
      'You can only delete your own review',
    );
  }

  return this.prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
}
async findAll() {
  return this.prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

async updateApproval(
  reviewId: string,
  dto: UpdateReviewApprovalDto,
) {
  const review = await this.prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new NotFoundException('Review not found');
  }

  return this.prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      isApproved: dto.isApproved,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}
}