import { Module } from '@nestjs/common';
import { CustomEnquiriesController } from './custom-enquiries.controller.js';
import { CustomEnquiriesService } from './custom-enquiries.service.js';

@Module({
  controllers: [CustomEnquiriesController],
  providers: [CustomEnquiriesService]
})
export class CustomEnquiriesModule {}
