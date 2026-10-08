import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { ProductsModule } from './products/products.module.js';
import { AuthModule } from './auth/auth.module.js';
import { WishlistModule } from './wishlist/wishlist.module.js';
import { RecentlyViewedModule } from './recently-viewed/recently-viewed.module.js';
import { CompareModule } from './compare/compare.module.js';
import { EnquiriesModule } from './enquiries/enquiries.module.js';
import { CustomEnquiriesModule } from './custom-enquiries/custom-enquiries.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { ContactModule } from './contact/contact.module.js';
import { CollectionsModule } from './collections/collections.module.js';
import { HomepageModule } from './homepage/homepage.module.js';
import { BlogModule } from './blog/blog.module.js';
import { DeliveryModule } from './delivery/delivery.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';

@Module({
  imports: [
    PrismaModule,
    CategoriesModule,
    ProductsModule,
    AuthModule,
    WishlistModule,
    RecentlyViewedModule,
    CompareModule,
    EnquiriesModule,
    CustomEnquiriesModule,
    ReviewsModule,
    ProjectsModule,
    ContactModule,
    CollectionsModule,
    HomepageModule,
    BlogModule,
    DeliveryModule,
    DashboardModule,
  ],
})

export class AppModule {}