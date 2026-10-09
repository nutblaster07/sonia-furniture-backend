
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import fs from 'node:fs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        ca: fs.readFileSync('/app/certs/ca.pem', 'utf8'),
        rejectUnauthorized: true,
      },
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
