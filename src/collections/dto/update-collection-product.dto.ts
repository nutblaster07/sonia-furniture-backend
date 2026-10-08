import { IsInt, Min } from 'class-validator';

export class UpdateCollectionProductDto {
  @IsInt()
  @Min(0)
  sortOrder: number;
}