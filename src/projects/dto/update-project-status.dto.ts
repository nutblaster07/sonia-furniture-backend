import { IsEnum } from 'class-validator';
import { ProjectStatus } from '../../generated/prisma/enums.js';

export class UpdateProjectStatusDto {
  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}