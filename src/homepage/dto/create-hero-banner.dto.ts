import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  MinLength,
} from 'class-validator';

export class CreateHeroBannerDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  subtitle?: string;

  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  buttonText?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  buttonLink?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}