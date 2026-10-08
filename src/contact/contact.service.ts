import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateContactMessageDto } from './dto/create-contact-message.dto.js';
import { UpdateContactStatusDto } from './dto/update-contact-status.dto.js';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactMessageDto) {
    return this.prisma.contactMessage.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        subject: dto.subject,
        message: dto.message,
      },
    });
  }

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const contactMessage =
      await this.prisma.contactMessage.findUnique({
        where: {
          id,
        },
      });

    if (!contactMessage) {
      throw new NotFoundException(
        'Contact message not found',
      );
    }

    return contactMessage;
  }
  async updateStatus(
  id: string,
  dto: UpdateContactStatusDto,
) {
  const contactMessage =
    await this.prisma.contactMessage.findUnique({
      where: {
        id,
      },
    });

  if (!contactMessage) {
    throw new NotFoundException(
      'Contact message not found',
    );
  }

  return this.prisma.contactMessage.update({
    where: {
      id,
    },
    data: {
      status: dto.status,
    },
  });
}
}