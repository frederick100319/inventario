import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthResponse } from './interfaces/auth-response.interface';
import { UsuarioDto } from '../dto/usuario.dto';
import { RegisterResponse } from './interfaces/auth-response.interface';

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
    const payload: JwtPayload = { sub: usuario.cedula, username: usuario.email, role: usuario.fk_rol.toString() };
    const accessToken = this.jwtService.sign(payload);

    // Devolver la respuesta de autenticación
    return {
      accessToken,
      expiresIn: 3600,
      user: {
        userId: usuario.cedula,
        username: usuario.nombre,
        role: usuario.fk_rol,
      },
    };
  }
  async register(usuarioDto: UsuarioDto): Promise<RegisterResponse> {
    try {
      // Verificar si el usuario ya existe
      const { cedula } = usuarioDto;
      const existingUser = await this.usuarioService.getUserByCedula(cedula);
      if (existingUser) {
        throw new ConflictException('Este usuario ya está registrado');
      }
    } catch (error) {
      // Manejar el caso de que no se encuentre el usuario
      if (error instanceof NotFoundException) {
        // Usuario no encontrado, proceder con la creación
        const newUser = await this.usuarioService.createUser(usuarioDto);
  
        // Generar el token de acceso
        const payload = { sub: newUser.cedula, email: newUser.email, role: newUser.fk_rol.toString() };
        const accessToken = this.jwtService.sign(payload);
  
        // Devolver la respuesta de registro
        return { 
            accessToken,
            expiresIn: 3600,
            user: {
                cedula: newUser.cedula,
                nombre: newUser.nombre,
                apellido: newUser.apellido,
                email: newUser.email,
                rol: newUser.fk_rol.toString()
            }
        };
      } else {
        throw error;
      }
    }
}
}
