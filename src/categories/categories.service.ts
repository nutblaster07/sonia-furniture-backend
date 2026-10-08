import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.findOne(id);

    return this.prisma.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
  await this.findOne(id);

  return this.prisma.category.delete({
    where: {
      id,
    },
  });
}

async findBySlug(slug: string) {
  const category = await this.prisma.category.findUnique({
    where: {
      slug,
    },
    include: {
      products: {
        where: {
          status: 'ACTIVE',
        },
        include: {
          images: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
          variants: {
            where: {
              isActive: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!category) {
    throw new NotFoundException('Category not found');
  }

  return category;
}

async findActive() {
  return this.prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

}