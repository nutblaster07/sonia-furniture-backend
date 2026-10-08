import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
} from '@nestjs/common';

import { ProductImagesService } from './product-images.service.js';
import { CreateProductImageDto } from './dto/create-product-image.dto.js';

@Controller('products/:productId/images')
export class ProductImagesController {
  constructor(
    private readonly productImagesService: ProductImagesService,
  ) {}

  @Post()
  create(
    @Param('productId') productId: string,
    @Body() createProductImageDto: CreateProductImageDto,
  ) {
    return this.productImagesService.create(
      productId,
      createProductImageDto,
    );
  }

  @Get()
  findAll(@Param('productId') productId: string) {
    return this.productImagesService.findAll(productId);
  }

 @Delete(':imageId')
remove(
  @Param('productId') productId: string,
  @Param('imageId') imageId: string,
) {
  return this.productImagesService.remove(
    productId,
    imageId,
  );
}

}