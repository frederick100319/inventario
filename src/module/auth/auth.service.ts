import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthResponse } from './interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { cedula, contrasena } = loginDto;

    // Verificar si el usuario existe en la base de datos
    const usuario = await this.usuarioService.getUserByCedula(cedula);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si la contraseña es correcta
    const contrasenaValida = await this.usuarioService.validatePassword(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar el token de acceso
    const payload: JwtPayload = { sub: usuario.cedula, email: usuario.email, role: usuario.fk_rol.toString() };
    const accessToken = this.jwtService.sign(payload);

    // Devolver la respuesta de autenticación
    return {
      accessToken,
      expiresIn: 1,
      user: {
        userId: usuario.cedula,
        username: usuario.nombre,
        role: usuario.fk_rol.toString(),
      },
    };
  }
}

