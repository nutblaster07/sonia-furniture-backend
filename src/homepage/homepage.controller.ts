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

import { HomepageService } from './homepage.service.js';

import { CreateHeroBannerDto } from './dto/create-hero-banner.dto.js';
import { UpdateHeroBannerDto } from './dto/update-hero-banner.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CreateCustomFurnitureBannerDto } from './dto/create-custom-furniture-banner.dto.js';
import { UpdateCustomFurnitureBannerDto } from './dto/update-custom-furniture-banner.dto.js';
import { CreateWhySoniaDto } from './dto/create-why-sonia.dto.js';
import { UpdateWhySoniaDto } from './dto/update-why-sonia.dto.js';

@Controller('homepage')
export class HomepageController {
  constructor(
    private readonly homepageService: HomepageService,
  ) {}

  // Public - Get active hero banners
  @Get('banners/active')
  findActiveBanners() {
    return this.homepageService.findActiveBanners();
  }

  // Admin - Create hero banner
  @Post('banners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  createBanner(
    @Body() createHeroBannerDto: CreateHeroBannerDto,
  ) {
    return this.homepageService.createBanner(
      createHeroBannerDto,
    );
  }

  // Admin - Get all hero banners
  @Get('banners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAllBanners() {
    return this.homepageService.findAllBanners();
  }

  // Admin - Get hero banner by ID
  @Get('banners/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findBannerById(@Param('id') id: string) {
    return this.homepageService.findBannerById(id);
  }
  // Public - Get featured collections
@Get('collections')
findFeaturedCollections() {
  return this.homepageService.findFeaturedCollections();
}

  // Admin - Update hero banner
  @Patch('banners/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateBanner(
    @Param('id') id: string,
    @Body() updateHeroBannerDto: UpdateHeroBannerDto,
  ) {
    return this.homepageService.updateBanner(
      id,
      updateHeroBannerDto,
    );
  }
  // Public - Get featured products
@Get('products')
findFeaturedProducts() {
  return this.homepageService.findFeaturedProducts();
}

  // Admin - Delete hero banner
  @Delete('banners/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  removeBanner(@Param('id') id: string) {
    return this.homepageService.removeBanner(id);
  }
  // Public - Get featured categories
@Get('categories')
findFeaturedCategories() {
  return this.homepageService.findFeaturedCategories();
}
@Get('projects')
findFeaturedProjects() {
  return this.homepageService.findFeaturedProjects();
}
@Get('reviews')
findFeaturedReviews() {
  return this.homepageService.findFeaturedReviews();
}
@Get('rooms')
findShopByRoom() {
  return this.homepageService.findShopByRoom();
}
@Post('custom-furniture-banners')
createCustomFurnitureBanner(
  @Body() createDto: CreateCustomFurnitureBannerDto,
) {
  return this.homepageService.createCustomFurnitureBanner(createDto);
}

@Get('custom-furniture-banners')
findAllCustomFurnitureBanners() {
  return this.homepageService.findAllCustomFurnitureBanners();
}

@Get('custom-furniture-banners/active')
findActiveCustomFurnitureBanners() {
  return this.homepageService.findActiveCustomFurnitureBanners();
}

@Get('custom-furniture-banners/:id')
findCustomFurnitureBannerById(@Param('id') id: string) {
  return this.homepageService.findCustomFurnitureBannerById(id);
}

@Patch('custom-furniture-banners/:id')
updateCustomFurnitureBanner(
  @Param('id') id: string,
  @Body() updateDto: UpdateCustomFurnitureBannerDto,
) {
  return this.homepageService.updateCustomFurnitureBanner(id, updateDto);
}

@Delete('custom-furniture-banners/:id')
removeCustomFurnitureBanner(@Param('id') id: string) {
  return this.homepageService.removeCustomFurnitureBanner(id);
}
@Post('why-sonia')
createWhySonia(@Body() createDto: CreateWhySoniaDto) {
  return this.homepageService.createWhySonia(createDto);
}

@Get('why-sonia')
findAllWhySonia() {
  return this.homepageService.findAllWhySonia();
}

@Get('why-sonia/active')
findActiveWhySonia() {
  return this.homepageService.findActiveWhySonia();
}

@Get('why-sonia/:id')
findWhySoniaById(@Param('id') id: string) {
  return this.homepageService.findWhySoniaById(id);
}

@Patch('why-sonia/:id')
updateWhySonia(
  @Param('id') id: string,
  @Body() updateDto: UpdateWhySoniaDto,
) {
  return this.homepageService.updateWhySonia(id, updateDto);
}

@Delete('why-sonia/:id')
removeWhySonia(@Param('id') id: string) {
  return this.homepageService.removeWhySonia(id);
}
}