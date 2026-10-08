import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

import { DeliveryService } from './delivery.service.js';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('check')
  checkPincode(@Query('pincode') pincode: string) {
    return this.deliveryService.checkPincode(pincode);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Get()
findAllDeliveryLocations() {
  return this.deliveryService.findAllDeliveryLocations();
}
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Patch(':id')
updateDeliveryLocation(
  @Param('id') id: string,
  @Body()
  data: {
    pincode?: string;
    city?: string;
    state?: string;
    isDeliverable?: boolean;
    deliveryCharge?: number;
    estimatedDays?: number;
  },
) {
  return this.deliveryService.updateDeliveryLocation(id, data);
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Delete(':id')
deleteDeliveryLocation(@Param('id') id: string) {
  return this.deliveryService.deleteDeliveryLocation(id);
}
  
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Post()
createDeliveryLocation(
  @Body()
  data: {
    pincode: string;
    city: string;
    state: string;
    isDeliverable?: boolean;
    deliveryCharge?: number;
    estimatedDays?: number;
  },
) {
  return this.deliveryService.createDeliveryLocation(data);
}
}