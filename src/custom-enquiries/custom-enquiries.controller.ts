import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

import { CreateCustomEnquiryDto } from './dto/create-custom-enquiry.dto.js';
import { CustomEnquiriesService } from './custom-enquiries.service.js';
import { UpdateCustomEnquiryStatusDto } from './dto/update-custom-enquiry-status.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    userId: string;
    email: string;
    role: string;
  };
};

@Controller('custom-enquiries')
export class CustomEnquiriesController {
  constructor(
    private readonly customEnquiriesService: CustomEnquiriesService,
  ) {}

  // Guest customer
  @Post()
  create(@Body() dto: CreateCustomEnquiryDto) {
    return this.customEnquiriesService.create(dto);
  }

  // Logged-in customer
  @UseGuards(JwtAuthGuard)
  @Post('authenticated')
  createAuthenticated(
    @Body() dto: CreateCustomEnquiryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.customEnquiriesService.create(
      dto,
      req.user.userId,
    );
  }

  // Admin - get all custom enquiries
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.customEnquiriesService.findAll();
  }

  // Admin - get one custom enquiry
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customEnquiriesService.findOne(id);
  }
    @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateCustomEnquiryStatusDto,
  ) {
    return this.customEnquiriesService.updateStatus(id, dto);
  }
}