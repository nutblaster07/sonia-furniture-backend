import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

@Get('active')
findActive() {
  return this.categoriesService.findActive();
}

@Get('slug/:slug')
findBySlug(@Param('slug') slug: string) {
  return this.categoriesService.findBySlug(slug);
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

@Patch(':id')
update(
  @Param('id') id: string,
  @Body() updateCategoryDto: UpdateCategoryDto,
) {
    //console.log('UPDATE CATEGORY DTO:', updateCategoryDto);

  return this.categoriesService.update(id, updateCategoryDto);
}

 @Delete(':id')
remove(@Param('id') id: string) {
  return this.categoriesService.remove(id);
}

}