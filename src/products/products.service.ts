import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ProductQueryDto } from './dto/product-query.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: createProductDto.categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.product.create({
      data: createProductDto,
    });
  }

async findAll(query: ProductQueryDto) {
  const {
    search,
    categoryId,
    status,
    featured,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = query;

  const where: any = {};

  // Search by product name
  if (search) {
    where.name = {
      contains: search,
      mode: 'insensitive',
    };
  }

  // Filter by category
  if (categoryId) {
    where.categoryId = categoryId;
  }

  // Filter by status
  if (status) {
    where.status = status;
  }

  // Filter featured products
  if (featured !== undefined) {
    where.isFeatured = featured;
  }

  // Price range
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.basePrice = {};

    if (minPrice !== undefined) {
      where.basePrice.gte = minPrice;
    }

    if (maxPrice !== undefined) {
      where.basePrice.lte = maxPrice;
    }
  }

  const skip = (page - 1) * limit;

  const products = await this.prisma.product.findMany({
    where,

    include: {
      category: true,
      images: {
        orderBy: {
          sortOrder: 'asc',
        },
      },
      variants: true,
    },

  orderBy: {
  [sortBy === 'price' ? 'basePrice' : sortBy]: sortOrder,
  },

    skip,
    take: limit,
  });

  const total = await this.prisma.product.count({
    where,
  });

  return {
    data: products,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

  async findOne(id: string) {
  const product = await this.prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      images: {
        orderBy: {
          sortOrder: 'asc',
        },
      },
      variants: true,
    },
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  return product;
}

async update(
  id: string,
  updateProductDto: UpdateProductDto,
) {
  console.log("UPDATE PRODUCT DTO:", updateProductDto);
  await this.findOne(id);

  if (updateProductDto.categoryId) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: updateProductDto.categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
  }

  return this.prisma.product.update({
    where: {
      id,
    },
    data: updateProductDto,
  });
}

async remove(id: string) {
  await this.findOne(id);

  return this.prisma.product.delete({
    where: {
      id,
    },
  });
}

async findBySlug(slug: string) {
  const product = await this.prisma.product.findUnique({
    where: {
      slug,
    },
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
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  return product;
}

async findByCategorySlug(categorySlug: string) {
  const category = await this.prisma.category.findUnique({
    where: {
      slug: categorySlug,
    },
  });

  if (!category) {
    throw new NotFoundException('Category not found');
  }

  return this.prisma.product.findMany({
    where: {
      categoryId: category.id,
      status: 'ACTIVE',
    },
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
    orderBy: {
      createdAt: 'desc',
    },
  });
}

}