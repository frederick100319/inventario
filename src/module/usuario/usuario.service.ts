import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioDto } from '../dto/usuario.dto';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import * as nodemailer from 'nodemailer';

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
  
  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
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
    Object.assign(usuario, usuarioDto);
    if (usuarioDto.contrasena) {
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

  async iniciarRecuperacionContrasena(cedula: string, email: string): Promise<string> {
    // Verificar si la combinación de cédula y correo electrónico existe en la base de datos
    const usuario = await this.usuarioRepository.findOne({ where: { cedula, email } });
    if (!usuario) {
        throw new NotFoundException('No se encontró ningún usuario con la cédula y el correo electrónico proporcionados.');
    }
    const resetToken = randomBytes(20).toString('hex');
    usuario.resetToken = resetToken;
    usuario.resetTokenExpira = new Date(Date.now() + 120000);
    await this.usuarioRepository.save(usuario);
    await this.enviarCorreoRecuperacionContrasena(usuario.email, resetToken);
    return 

}

  async enviarCorreoRecuperacionContrasena(email: string, resetToken: string): Promise<string> {
    // Configura el transporter para enviar correos electrónicos utilizando un servicio SMTP
    const transporter = nodemailer.createTransport({
      // Configura las opciones del servicio de correo electrónico (por ejemplo, Gmail)
      service: 'gmail',
      auth: {
        user: 'torcan.recuperacion@gmail.com', // Cambia esto por tu dirección de correo electrónico
        pass: 'sdih mwfj xhdf ydjl', // Cambia esto por tu contraseña de correo electrónico
      },
    });

    // Define el contenido del correo electrónico
    const mailOptions = {
      from: 'torcan.recuperacion@gmail.com', // Cambia esto por tu dirección de correo electrónico
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:3000/usuarios/reset-password/${resetToken}`,
    };
    await transporter.sendMail(mailOptions);
    return "Email enviado con éxito"
  }

  async resetPassword(token: string, nuevaContrasena: string): Promise<string> {
    // Buscar el usuario por el token de restablecimiento
    const usuario = await this.usuarioRepository.findOne({ where: { resetToken: token } });
    if (!usuario) {
        throw new NotFoundException('Token de restablecimiento de contraseña inválido');
    }

    // Verificar si el token ha expirado
    if (usuario.resetTokenExpira < new Date()) {
        // Token expirado, limpiar el token y lanzar una excepción
        usuario.resetToken = null;
        usuario.resetTokenExpira = null;
        await this.usuarioRepository.save(usuario);
        throw new NotFoundException('El token de restablecimiento de contraseña ha caducado');
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

    // Actualizar la contraseña del usuario y limpiar el token de restablecimiento
    usuario.contrasena = hashedPassword;
    usuario.resetToken = null;
    usuario.resetTokenExpira = null;
    await this.usuarioRepository.save(usuario);

    return 'Contraseña cambiada con éxito';
}
}

