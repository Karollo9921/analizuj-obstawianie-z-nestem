import {
  registerDecorator, 
  ValidationArguments, 
  ValidationOptions, 
  ValidatorConstraint, 
  ValidatorConstraintInterface,
  IsString, 
  MaxLength, 
  MinLength,
  IsEmail
} from 'class-validator';

function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'Match' })
class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  };
};

export class RegisterDto {
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

  @Match('password')
  passwordConfirm: string;
};