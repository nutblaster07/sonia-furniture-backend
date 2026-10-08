import { IsBoolean } from 'class-validator';

export class UpdateReviewApprovalDto {
  @IsBoolean()
  isApproved: boolean;
}