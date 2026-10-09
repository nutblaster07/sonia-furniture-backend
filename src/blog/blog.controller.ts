import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

import { BlogService } from './blog.service.js';

import { CreateBlogCategoryDto } from './dto/create-blog-category.dto.js';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto.js';
import { CreateBlogPostDto } from './dto/create-blog-post.dto.js';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto.js';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
  ) {}

  // =========================
  // BLOG CATEGORIES
  // =========================

  @Post('categories')
  createCategory(
    @Body() dto: CreateBlogCategoryDto,
  ) {
    return this.blogService.createCategory(dto);
  }

  @Get('categories')
  findAllCategories() {
    return this.blogService.findAllCategories();
  }

  @Get('categories/active')
  findActiveCategories() {
    return this.blogService.findActiveCategories();
  }

  @Get('categories/:id')
  findCategoryById(
    @Param('id') id: string,
  ) {
    return this.blogService.findCategoryById(id);
  }

  @Patch('categories/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateBlogCategoryDto,
  ) {
    return this.blogService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  removeCategory(
    @Param('id') id: string,
  ) {
    return this.blogService.removeCategory(id);
  }

  // =========================
  // BLOG POSTS
  // =========================

  @Post('posts')
  createPost(
    @Body() dto: CreateBlogPostDto,
  ) {
    return this.blogService.createPost(dto);
  }

  @Get('posts')
  findAllPosts() {
    return this.blogService.findAllPosts();
  }

  @Get('posts/published')
  findPublishedPosts() {
    return this.blogService.findPublishedPosts();
  }

  @Get('posts/featured')
  findFeaturedPosts() {
    return this.blogService.findFeaturedPosts();
  }

  @Get('posts/slug/:slug')
  findPostBySlug(
    @Param('slug') slug: string,
  ) {
    return this.blogService.findPostBySlug(slug);
  }

  @Get('posts/:id')
  findPostById(
    @Param('id') id: string,
  ) {
    return this.blogService.findPostById(id);
  }

  @Patch('posts/:id')
  updatePost(
    @Param('id') id: string,
    @Body() dto: UpdateBlogPostDto,
  ) {
    return this.blogService.updatePost(id, dto);
  }

  @Delete('posts/:id')
  removePost(
    @Param('id') id: string,
  ) {
    return this.blogService.removePost(id);
  }
}