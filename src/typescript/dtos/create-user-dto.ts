import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
