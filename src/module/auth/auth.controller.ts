import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { AuthResponse, RegisterResponse } from './interfaces/auth-response.interface';
import { UsuarioDto } from '../dto/usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    const authResponse = await this.authService.login(loginDto);
    return authResponse;
  }
  @Post('register')
  async register(@Body() usuarioDto: UsuarioDto): Promise<RegisterResponse> {
    const registerResponse = await this.authService.register(usuarioDto);
    return registerResponse;
  }
}
