import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductVariantsService } from './product-variants.service.js';
import { CreateProductVariantDto } from './dto/create-product-variant.dto.js';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto.js';

@Controller('products/:productId/variants')
export class ProductVariantsController {
  constructor(
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @Post()
  create(
    @Param('productId') productId: string,
    @Body() createProductVariantDto: CreateProductVariantDto,
  ) {
    return this.productVariantsService.create(
      productId,
      createProductVariantDto,
    );
  }

  @Get()
  findAll(@Param('productId') productId: string) {
    return this.productVariantsService.findAll(productId);
  }

  @Patch(':variantId')
  update(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return this.productVariantsService.update(
      productId,
      variantId,
      updateProductVariantDto,
    );
  }

  @Delete(':variantId')
  remove(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ) {
    return this.productVariantsService.remove(
      productId,
      variantId,
    );
  }
}