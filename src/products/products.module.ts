import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';
import { ProductImagesController } from './product-images.controller.js';
import { ProductImagesService } from './product-images.service.js';
import { ProductVariantsController } from './product-variants.controller.js';
import { ProductVariantsService } from './product-variants.service.js';

@Module({
  controllers: [
    ProductsController,
    ProductImagesController,
    ProductVariantsController,
  ],
  providers: [
    ProductsService,
    ProductImagesService,
    ProductVariantsService,
  ],
})
export class ProductsModule {}