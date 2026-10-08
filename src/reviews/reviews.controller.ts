import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

import { CreateReviewDto } from './dto/create-review.dto.js';
import { ReviewsService } from './reviews.service.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';

import { UpdateReviewApprovalDto } from './dto/update-review-approval.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    userId: string;
    email: string;
    role: string;
  };
};

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}

@Get('product/:productId')
findByProduct(@Param('productId') productId: string) {
  return this.reviewsService.findByProduct(productId);
}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: CreateReviewDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.reviewsService.create(
      dto,
      req.user.userId,
    );
  }
  @UseGuards(JwtAuthGuard)
@Patch(':id')
update(
  @Param('id') id: string,
  @Body() dto: UpdateReviewDto,
  @Req() req: AuthenticatedRequest,
) {
  return this.reviewsService.update(
    id,
    dto,
    req.user.userId,
  );
}
@UseGuards(JwtAuthGuard)
@Delete(':id')
remove(
  @Param('id') id: string,
  @Req() req: AuthenticatedRequest,
) {
  return this.reviewsService.remove(
    id,
    req.user.userId,
  );
}
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Get()
findAll() {
  return this.reviewsService.findAll();
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Patch(':id/approve')
updateApproval(
  @Param('id') id: string,
  @Body() dto: UpdateReviewApprovalDto,
) {
  return this.reviewsService.updateApproval(id, dto);
}
}