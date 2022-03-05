import {
  IsString, 
  MaxLength, 
  MinLength,
  IsEmail
} from 'class-validator';

export class LoginDto {
  @IsString()
  loginEmail: string;

  @IsString()
  @MinLength(6, { message: 'Your password is too short !' })
  @MaxLength(20, { message: 'Your password is too long !' })
  password: string;
};