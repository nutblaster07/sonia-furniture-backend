import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCollectionDto } from './dto/create-collection.dto.js';
import { UpdateCollectionDto } from './dto/update-collection.dto.js';
import { AddCollectionProductDto } from './dto/add-collection-product.dto.js';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create Collection
  async create(createCollectionDto: CreateCollectionDto) {
    const existingCollection = await this.prisma.collection.findUnique({
      where: {
        slug: createCollectionDto.slug,
      },
    });

    if (existingCollection) {
      throw new ConflictException(
        'A collection with this slug already exists',
      );
    }

    return this.prisma.collection.create({
      data: createCollectionDto,
    });
  }

  // Get all Collections
  async findAll() {
    return this.prisma.collection.findMany({
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

  // Get active Collections
  async findActive() {
    return this.prisma.collection.findMany({
      where: {
        isActive: true,
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

  // Get Collection by ID
  async findOne(id: string) {
    const collection = await this.prisma.collection.findUnique({
      where: {
        id,
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

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    return collection;
  }

  // Get Collection by slug
  async findBySlug(slug: string) {
    const collection = await this.prisma.collection.findUnique({
      where: {
        slug,
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

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    return collection;
  }

  // Update Collection
  async update(
    id: string,
    updateCollectionDto: UpdateCollectionDto,
  ) {
    const collection = await this.prisma.collection.findUnique({
      where: {
        id,
      },
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    if (
      updateCollectionDto.slug &&
      updateCollectionDto.slug !== collection.slug
    ) {
      const existingCollection =
        await this.prisma.collection.findUnique({
          where: {
            slug: updateCollectionDto.slug,
          },
        });

      if (existingCollection) {
        throw new ConflictException(
          'A collection with this slug already exists',
        );
      }
    }

    return this.prisma.collection.update({
      where: {
        id,
      },
      data: updateCollectionDto,
    });
  }

  // Delete Collection
  async remove(id: string) {
    const collection = await this.prisma.collection.findUnique({
      where: {
        id,
      },
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    return this.prisma.collection.delete({
      where: {
        id,
      },
    });
  }
  async addProduct(
  collectionId: string,
  addCollectionProductDto: AddCollectionProductDto,
) {
  const collection = await this.prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
  });

  if (!collection) {
    throw new NotFoundException('Collection not found');
  }

  const product = await this.prisma.product.findUnique({
    where: {
      id: addCollectionProductDto.productId,
    },
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  const existingProduct =
    await this.prisma.collectionProduct.findUnique({
      where: {
        collectionId_productId: {
          collectionId,
          productId: addCollectionProductDto.productId,
        },
      },
    });

  if (existingProduct) {
    throw new ConflictException(
      'Product already exists in this collection',
    );
  }

  return this.prisma.collectionProduct.create({
    data: {
      collectionId,
      productId: addCollectionProductDto.productId,
      sortOrder: addCollectionProductDto.sortOrder ?? 0,
    },
    include: {
      product: true,
      collection: true,
    },
  });
}
async removeProduct(
  collectionId: string,
  productId: string,
) {
  const collectionProduct =
    await this.prisma.collectionProduct.findUnique({
      where: {
        collectionId_productId: {
          collectionId,
          productId,
        },
      },
    });

  if (!collectionProduct) {
    throw new NotFoundException(
      'Product is not part of this collection',
    );
  }

  return this.prisma.collectionProduct.delete({
    where: {
      collectionId_productId: {
        collectionId,
        productId,
      },
    },
  });
}
async updateProduct(
  collectionId: string,
  productId: string,
  sortOrder: number,
) {
  const collectionProduct =
    await this.prisma.collectionProduct.findUnique({
      where: {
        collectionId_productId: {
          collectionId,
          productId,
        },
      },
    });

  if (!collectionProduct) {
    throw new NotFoundException(
      'Product is not part of this collection',
    );
  }

  return this.prisma.collectionProduct.update({
    where: {
      collectionId_productId: {
        collectionId,
        productId,
      },
    },
    data: {
      sortOrder,
    },
    include: {
      product: true,
      collection: true,
    },
  });
}
}