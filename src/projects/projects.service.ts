import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { UpdateProjectStatusDto } from './dto/update-project-status.dto.js';
import { CreateProjectImageDto } from './dto/create-project-image.dto.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    const existingProject = await this.prisma.project.findUnique({
      where: {
        slug: dto.slug,
      },
    });

    if (existingProject) {
      throw new ConflictException(
        'A project with this slug already exists',
      );
    }

    return this.prisma.project.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        location: dto.location,
        category: dto.category,
        isFeatured: dto.isFeatured ?? false,
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

  async findAll() {
    return this.prisma.project.findMany({
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

  async findPublished() {
    return this.prisma.project.findMany({
      where: {
        status: 'PUBLISHED',
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

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        images: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        slug,
      },
      include: {
        images: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (dto.slug && dto.slug !== project.slug) {
      const existingProject = await this.prisma.project.findUnique({
        where: {
          slug: dto.slug,
        },
      });

      if (existingProject) {
        throw new ConflictException(
          'A project with this slug already exists',
        );
      }
    }

    return this.prisma.project.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        location: dto.location,
        category: dto.category,
        isFeatured: dto.isFeatured,
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

  async remove(id: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.prisma.project.delete({
      where: {
        id,
      },
    });
  }
  async updateStatus(
  id: string,
  dto: UpdateProjectStatusDto,
) {
  const project = await this.prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    throw new NotFoundException('Project not found');
  }

  return this.prisma.project.update({
    where: {
      id,
    },
    data: {
      status: dto.status,
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
async addImage(
  projectId: string,
  dto: CreateProjectImageDto,
) {
  const project = await this.prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    throw new NotFoundException('Project not found');
  }

  return this.prisma.projectImage.create({
    data: {
      imageUrl: dto.imageUrl,
      altText: dto.altText,
      sortOrder: dto.sortOrder ?? 0,
      projectId,
    },
  });
}

async removeImage(imageId: string) {
  const image = await this.prisma.projectImage.findUnique({
    where: {
      id: imageId,
    },
  });

  if (!image) {
    throw new NotFoundException('Project image not found');
  }

  return this.prisma.projectImage.delete({
    where: {
      id: imageId,
    },
  });
}
}