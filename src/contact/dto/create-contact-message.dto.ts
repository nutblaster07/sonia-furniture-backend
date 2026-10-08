import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateContactMessageDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, {
    message: 'Phone must be exactly 10 digits',
  })
  phone?: string;

  @IsString()
  @MinLength(2)
  subject: string;

  @IsString()
  @MinLength(10)
  message: string;
}