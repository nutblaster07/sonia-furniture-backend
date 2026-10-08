import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

import { DashboardService } from './dashboard.service.js';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('products/count')
  getTotalProducts() {
    return this.dashboardService.getTotalProducts();
  }
  @Get('customers/count')
  getTotalCustomers() {
  return this.dashboardService.getTotalCustomers();
}
@Get('enquiries/new/count')
getNewEnquiries() {
  return this.dashboardService.getNewEnquiries();
}
@Get('custom-enquiries/count')
getCustomEnquiries() {
  return this.dashboardService.getCustomEnquiries();
}
@Get('reviews/pending/count')
getPendingReviews() {
  return this.dashboardService.getPendingReviews();
}
@Get('projects/count')
getProjects() {
  return this.dashboardService.getProjects();
}
@Get('enquiries/recent')
getRecentEnquiries() {
  return this.dashboardService.getRecentEnquiries();
}
@Get('summary')
getDashboardSummary() {
  return this.dashboardService.getDashboardSummary();
}
}