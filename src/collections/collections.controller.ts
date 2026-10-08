import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CollectionsService } from './collections.service.js';
import { CreateCollectionDto } from './dto/create-collection.dto.js';
import { UpdateCollectionDto } from './dto/update-collection.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { AddCollectionProductDto } from './dto/add-collection-product.dto.js';
import { UpdateCollectionProductDto } from './dto/update-collection-product.dto.js';

@Controller('collections')
export class CollectionsController {
  constructor(
    private readonly collectionsService: CollectionsService,
  ) {}

  // Public - Get all active collections
  @Get('active')
  findActive() {
    return this.collectionsService.findActive();
  }

  // Public - Get collection by slug
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.collectionsService.findBySlug(slug);
  }

  // Admin - Create collection
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  // Admin - Get all collections
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAll() {
    return this.collectionsService.findAll();
  }
    // Admin - Add product to collection
  @Post(':collectionId/products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  addProduct(
    @Param('collectionId') collectionId: string,
    @Body() addCollectionProductDto: AddCollectionProductDto,
  ) {
    return this.collectionsService.addProduct(
      collectionId,
      addCollectionProductDto,
    );
  }

  // Admin - Remove product from collection
  @Delete(':collectionId/products/:productId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  removeProduct(
    @Param('collectionId') collectionId: string,
    @Param('productId') productId: string,
  ) {
    return this.collectionsService.removeProduct(
      collectionId,
      productId,
    );
  }
  // Admin - Update product order in collection
@Patch(':collectionId/products/:productId')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
updateProduct(
  @Param('collectionId') collectionId: string,
  @Param('productId') productId: string,
  @Body() updateCollectionProductDto: UpdateCollectionProductDto,
) {
  return this.collectionsService.updateProduct(
    collectionId,
    productId,
    updateCollectionProductDto.sortOrder,
  );
}

  // Admin - Get collection by ID
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(id);
  }

  // Admin - Update collection
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(
      id,
      updateCollectionDto,
    );
  }

  // Admin - Delete collection
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(id);
  }
}