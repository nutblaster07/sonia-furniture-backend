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

import { CreateEnquiryDto } from './dto/create-enquiry.dto.js';
import { UpdateEnquiryStatusDto } from './dto/update-enquiry-status.dto.js';
import { EnquiriesService } from './enquiries.service.js';

type AuthenticatedRequest = Request & {
  user: {
    userId: string;
    email: string;
    role: string;
  };
};

@Controller('enquiries')
export class EnquiriesController {
  constructor(
    private readonly enquiriesService: EnquiriesService,
  ) {}

  // Guest enquiry
  @Post()
  create(@Body() dto: CreateEnquiryDto) {
    return this.enquiriesService.create(dto);
  }

  // Logged-in customer enquiry
  @UseGuards(JwtAuthGuard)
  @Post('authenticated')
  createAuthenticated(
    @Body() dto: CreateEnquiryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.enquiriesService.create(
      dto,
      req.user.userId,
    );
  }
  // Logged-in customer - get own enquiries
@UseGuards(JwtAuthGuard)
@Get('my')
findMyEnquiries(@Req() req: AuthenticatedRequest) {
  return this.enquiriesService.findByUser(
    req.user.userId,
  );
}

  // Admin only - get all enquiries
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.enquiriesService.findAll();
  }

  // Admin only - get one enquiry
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enquiriesService.findOne(id);
  }

  // Admin only - update enquiry status
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateEnquiryStatusDto,
  ) {
    return this.enquiriesService.updateStatus(
      id,
      dto,
    );
  }
}