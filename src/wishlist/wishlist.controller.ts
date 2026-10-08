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
import { WishlistService } from './wishlist.service.js';

type AuthenticatedRequest = Request & {
  user: {
    userId: string;
    email: string;
    role: string;
  };
};

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId')
  addToWishlist(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
  ) {
    return this.wishlistService.add(req.user.userId, productId);
  }

  @Get()
  getWishlist(@Req() req: AuthenticatedRequest) {
    return this.wishlistService.findAll(req.user.userId);
  }

  @Delete(':productId')
  removeFromWishlist(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
  ) {
    return this.wishlistService.remove(req.user.userId, productId);
  }
}