import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreateHeroBannerDto } from './dto/create-hero-banner.dto.js';
import { UpdateHeroBannerDto } from './dto/update-hero-banner.dto.js';
import { CreateCustomFurnitureBannerDto } from './dto/create-custom-furniture-banner.dto.js';
import { UpdateCustomFurnitureBannerDto } from './dto/update-custom-furniture-banner.dto.js';
import { CreateWhySoniaDto } from './dto/create-why-sonia.dto.js';
import { UpdateWhySoniaDto } from './dto/update-why-sonia.dto.js';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  // Create Hero Banner
  async createBanner(createHeroBannerDto: CreateHeroBannerDto) {
    return this.prisma.heroBanner.create({
      data: createHeroBannerDto,
    });
  }

  // Get all Hero Banners
  async findAllBanners() {
    return this.prisma.heroBanner.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  // Get active Hero Banners
  async findActiveBanners() {
    return this.prisma.heroBanner.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  // Get Hero Banner by ID
  async findBannerById(id: string) {
    const banner = await this.prisma.heroBanner.findUnique({
      where: {
        id,
      },
    });

    if (!banner) {
      throw new NotFoundException('Hero banner not found');
    }

    return banner;
  }

  // Update Hero Banner
  async updateBanner(
    id: string,
    updateHeroBannerDto: UpdateHeroBannerDto,
  ) {
    const banner = await this.prisma.heroBanner.findUnique({
      where: {
        id,
      },
    });

    if (!banner) {
      throw new NotFoundException('Hero banner not found');
    }

    return this.prisma.heroBanner.update({
      where: {
        id,
      },
      data: updateHeroBannerDto,
    });
  }

  // Delete Hero Banner
  async removeBanner(id: string) {
    const banner = await this.prisma.heroBanner.findUnique({
      where: {
        id,
      },
    });

    if (!banner) {
      throw new NotFoundException('Hero banner not found');
    }

    return this.prisma.heroBanner.delete({
      where: {
        id,
      },
    });
  }
  // Get featured collections for homepage
async findFeaturedCollections() {
  return this.prisma.collection.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    orderBy: {
      sortOrder: 'asc',
    },
    include: {
      products: {
        include: {
          product: true,
        },
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
  });
}
// Get featured products for homepage
async findFeaturedProducts() {
  return this.prisma.product.findMany({
    where: {
      status: 'ACTIVE',
      isFeatured: true,
    },
    orderBy: {
      createdAt: 'desc',
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
}
// Get featured categories for homepage
async findFeaturedCategories() {
  return this.prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: [
      {
        parentId: 'asc',
      },
      {
        sortOrder: 'asc',
      },
    ],
  });
}
async findFeaturedProjects() {
  return this.prisma.project.findMany({
    where: {
      status: 'PUBLISHED',
      isFeatured: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      images: {
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
  });
}
async findFeaturedReviews() {
  return this.prisma.review.findMany({
    where: {
      isApproved: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 6,
    include: {
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
async findShopByRoom() {
  return this.prisma.category.findMany({
    where: {
      isActive: true,
      isRoomCategory: true,
    },
    orderBy: {
      sortOrder: 'asc',
    },
  });
}
async createCustomFurnitureBanner(
  createDto: CreateCustomFurnitureBannerDto,
) {
  return this.prisma.customFurnitureBanner.create({
    data: createDto,
  });
}

async findAllCustomFurnitureBanners() {
  return this.prisma.customFurnitureBanner.findMany({
    orderBy: {
      sortOrder: 'asc',
    },
  });
}

async findActiveCustomFurnitureBanners() {
  return this.prisma.customFurnitureBanner.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: 'asc',
    },
  });
}

async findCustomFurnitureBannerById(id: string) {
  return this.prisma.customFurnitureBanner.findUnique({
    where: { id },
  });
}

async updateCustomFurnitureBanner(
  id: string,
  updateDto: UpdateCustomFurnitureBannerDto,
) {
  return this.prisma.customFurnitureBanner.update({
    where: { id },
    data: updateDto,
  });
}

async removeCustomFurnitureBanner(id: string) {
  return this.prisma.customFurnitureBanner.delete({
    where: { id },
  });
}
async createWhySonia(createDto: CreateWhySoniaDto) {
  return this.prisma.whySonia.create({
    data: createDto,
  });
}

async findAllWhySonia() {
  return this.prisma.whySonia.findMany({
    orderBy: {
      sortOrder: 'asc',
    },
  });
}

async findActiveWhySonia() {
  return this.prisma.whySonia.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: 'asc',
    },
  });
}

async findWhySoniaById(id: string) {
  return this.prisma.whySonia.findUnique({
    where: { id },
  });
}

async updateWhySonia(
  id: string,
  updateDto: UpdateWhySoniaDto,
) {
  return this.prisma.whySonia.update({
    where: { id },
    data: updateDto,
  });
}

async removeWhySonia(id: string) {
  return this.prisma.whySonia.delete({
    where: { id },
  });
}
}