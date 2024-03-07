import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from '../dto/usuario.dto';
import { Usuario } from '../entities/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() usuarioDto: UsuarioDto) {
    usuarioDto.fk_rol= 1;
    return this.usuarioService.createUser(usuarioDto);
  }

  @Get()
  async findAll():Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':cedula')
  async getUserByCedula(@Param('cedula') cedula: string) {
    return this.usuarioService.getUserByCedula(cedula);
  }

  @Put(':cedula')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('cedula') cedula: string, @Body() usuarioDto: UsuarioDto) {
    return this.usuarioService.updateUser(cedula, usuarioDto);
  }
  
  
  
  

  @Delete(':cedula')
  async deleteUser(@Param('cedula') cedula: string) {
    return this.usuarioService.deleteUser(cedula);
  }
}

