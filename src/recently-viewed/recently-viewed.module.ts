import { Module } from '@nestjs/common';
import { RecentlyViewedController } from './recently-viewed.controller.js';
import { RecentlyViewedService } from './recently-viewed.service.js';

@Module({
  controllers: [RecentlyViewedController],
  providers: [RecentlyViewedService],
})
export class RecentlyViewedModule {}