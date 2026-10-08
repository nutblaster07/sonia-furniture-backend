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
import { CompareService } from './compare.service.js';

type AuthenticatedRequest = Request & {
  user: {
    userId: string;
    email: string;
    role: string;
  };
};

@Controller('compare')
@UseGuards(JwtAuthGuard)
export class CompareController {
  constructor(
    private readonly compareService: CompareService,
  ) {}

  @Post(':productId')
  add(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
  ) {
    return this.compareService.add(
      req.user.userId,
      productId,
    );
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.compareService.findAll(
      req.user.userId,
    );
  }

  @Delete(':productId')
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
  ) {
    return this.compareService.remove(
      req.user.userId,
      productId,
    );
  }
}