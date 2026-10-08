import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RecentlyViewedService } from './recently-viewed.service.js';

type AuthenticatedRequest = Request & {
  user: {
    userId: string;
    email: string;
    role: string;
  };
};

@Controller('recently-viewed')
@UseGuards(JwtAuthGuard)
export class RecentlyViewedController {
  constructor(
    private readonly recentlyViewedService: RecentlyViewedService,
  ) {}

  @Post(':productId')
  add(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
  ) {
    return this.recentlyViewedService.add(
      req.user.userId,
      productId,
    );
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.recentlyViewedService.findAll(
      req.user.userId,
    );
  }

  @Delete(':productId')
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
  ) {
    return this.recentlyViewedService.remove(
      req.user.userId,
      productId,
    );
  }
}