import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreateBlogCategoryDto } from './dto/create-blog-category.dto.js';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto.js';
import { CreateBlogPostDto } from './dto/create-blog-post.dto.js';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto.js';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================
  // BLOG CATEGORIES
  // =========================

  async createCategory(dto: CreateBlogCategoryDto) {
    return this.prisma.blogCategory.create({
      data: dto,
    });
  }

  async findAllCategories() {
    return this.prisma.blogCategory.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async findActiveCategories() {
    return this.prisma.blogCategory.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async findCategoryById(id: string) {
    const category = await this.prisma.blogCategory.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Blog category not found');
    }

    return category;
  }

  async updateCategory(
    id: string,
    dto: UpdateBlogCategoryDto,
  ) {
    await this.findCategoryById(id);

    return this.prisma.blogCategory.update({
      where: { id },
      data: dto,
    });
  }

  async removeCategory(id: string) {
    await this.findCategoryById(id);

    return this.prisma.blogCategory.delete({
      where: { id },
    });
  }

  // =========================
  // BLOG POSTS
  // =========================

  async createPost(dto: CreateBlogPostDto) {
    return this.prisma.blogPost.create({
      data: {
        ...dto,
        publishedAt: dto.publishedAt
          ? new Date(dto.publishedAt)
          : undefined,
      },
      include: {
        category: true,
      },
    });
  }

  async findAllPosts() {
    return this.prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
  }

  async findPublishedPosts() {
    return this.prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        category: true,
      },
    });
  }

  async findFeaturedPosts() {
    return this.prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        isFeatured: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 6,
      include: {
        category: true,
      },
    });
  }

  async findPostById(id: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return post;
  }

  async findPostBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return post;
  }

  async updatePost(
    id: string,
    dto: UpdateBlogPostDto,
  ) {
    await this.findPostById(id);

    return this.prisma.blogPost.update({
      where: { id },
      data: {
        ...dto,
        publishedAt: dto.publishedAt
          ? new Date(dto.publishedAt)
          : undefined,
      },
      include: {
        category: true,
      },
    });
  }

  async removePost(id: string) {
    await this.findPostById(id);

    return this.prisma.blogPost.delete({
      where: { id },
    });
  }
}