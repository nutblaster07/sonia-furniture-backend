import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCustomEnquiryDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[0-9]{10}$/, {
    message: 'Phone must be exactly 10 digits',
  })
  phone: string;

  @IsString()
  @MinLength(2)
  furnitureType: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  materialPreference?: string;

  @IsOptional()
  @IsString()
  dimensions?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  budget?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Matches(/^[0-9]{6}$/, {
    message: 'Pincode must be exactly 6 digits',
  })
  pincode?: string;
}