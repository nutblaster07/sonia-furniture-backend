import { Module } from '@nestjs/common';
import { CompareController } from './compare.controller.js';
import { CompareService } from './compare.service.js';

@Module({
  controllers: [CompareController],
  providers: [CompareService],
})
export class CompareModule {}