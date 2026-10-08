import { IsEnum } from 'class-validator';
import { EnquiryStatus } from '../../generated/prisma/enums.js';

export class UpdateEnquiryStatusDto {
  @IsEnum(EnquiryStatus)
  status: EnquiryStatus;
}