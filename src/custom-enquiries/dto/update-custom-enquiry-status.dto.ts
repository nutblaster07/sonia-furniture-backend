import { IsEnum } from 'class-validator';
import { CustomEnquiryStatus } from '../../generated/prisma/enums.js';

export class UpdateCustomEnquiryStatusDto {
  @IsEnum(CustomEnquiryStatus)
  status: CustomEnquiryStatus;
}