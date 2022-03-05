import {
  IsString, 
  MaxLength, 
  MinLength,
  IsEmail
} from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(2, { message: 'Your login is too short !' })
  @MaxLength(15, { message: 'Your login is too long !' })
  login: string;

  @IsString()
  @IsEmail()
  @MinLength(6)
  @MaxLength(20)
  email: string;  

  @IsString()
  @MinLength(6, { message: 'Your password is too short !' })
  @MaxLength(20, { message: 'Your password is too long !' })
  password: string;
};