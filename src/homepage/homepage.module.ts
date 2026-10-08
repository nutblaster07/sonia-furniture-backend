import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller.js';
import { HomepageService } from './homepage.service.js';

@Module({
  controllers: [HomepageController],
  providers: [HomepageService]
})
export class HomepageModule {}
