import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioDto } from '../dto/usuario.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async createUser(usuarioDto: UsuarioDto): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(usuarioDto.contrasena, 10);
    const usuario = this.usuarioRepository.create({
        cedula:usuarioDto.cedula,
        nombre:usuarioDto.nombre,
        apellido:usuarioDto.apellido,
        email:usuarioDto.email,
        contrasena:hashedPassword,
        fk_rol:usuarioDto.fk_rol
    });
    return this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['fk_rol'] });
  }

  async getUserByCedula(cedula: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { cedula }, relations: ['fk_rol'] });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async updateUser(cedula: string, usuarioDto: UsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { cedula } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    // Actualizar todos los datos del usuario
    Object.assign(usuario, usuarioDto);
    // Verificar si se proporcionó una nueva contraseña
    if (usuarioDto.contrasena) {
      // Cifrar la nueva contraseña
      const hashedPassword = await bcrypt.hash(usuarioDto.contrasena, 10);
      usuario.contrasena = hashedPassword;
    }

    return this.usuarioRepository.save(usuario);
  }
  

  async deleteUser(cedula: string): Promise<void> {
    const result = await this.usuarioRepository.delete({ cedula });
    if (result.affected === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}

