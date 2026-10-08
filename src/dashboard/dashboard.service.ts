import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalProducts() {
    return this.prisma.product.count();
  }
  async getTotalCustomers() {
  return this.prisma.user.count({
    where: {
      role: 'CUSTOMER',
    },
  });
}
async getNewEnquiries() {
  return this.prisma.enquiry.count({
    where: {
      status: {
        in: ['NEW', 'CONTACTED', 'IN_PROGRESS'],
      },
    },
  });
}
async getCustomEnquiries() {
  return this.prisma.customEnquiry.count();
}
async getPendingReviews() {
  return this.prisma.review.count({
    where: {
      isApproved: false,
    },
  });
}
async getProjects() {
  return this.prisma.project.count();
}
async getRecentEnquiries() {
  return this.prisma.enquiry.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });
}
async getDashboardSummary() {
  const [
    totalProducts,
    totalCustomers,
    newEnquiries,
    customEnquiries,
    pendingReviews,
    projects,
  ] = await Promise.all([
    this.getTotalProducts(),
    this.getTotalCustomers(),
    this.getNewEnquiries(),
    this.getCustomEnquiries(),
    this.getPendingReviews(),
    this.getProjects(),
  ]);

  return {
    totalProducts,
    totalCustomers,
    newEnquiries,
    customEnquiries,
    pendingReviews,
    projects,
  };
}
}