
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const ca = process.env.DATABASE_CA_CERT?.replace(/\\n/g, '\n').trim();
    console.log('DATABASE_CA_CERT present:', Boolean(ca));
    console.log('DATABASE_CA_CERT has PEM header:', ca?.includes('-----BEGIN CERTIFICATE-----'));
    console.log('DATABASE_CA_CERT has PEM footer:', ca?.includes('-----END CERTIFICATE-----'));
    console.log('DATABASE_CA_CERT length:', ca?.length);

    if (!ca) {
      throw new Error('DATABASE_CA_CERT environment variable is missing');
    }

    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        ca,
        rejectUnauthorized: true,
      },
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
