import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  cedula: string;

  @IsNotEmpty()
  @IsString()
  contrasena: string;
}
