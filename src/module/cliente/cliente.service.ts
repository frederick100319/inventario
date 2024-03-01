import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { ClienteDto } from '../dto/cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(clienteDto: ClienteDto): Promise<Cliente> {
    // Verificar el tipo de persona y la longitud de cedula_ruc
    if (clienteDto.fk_persona === 1 && clienteDto.cedula_ruc.length !== 10) {
      throw new BadRequestException('La cédula debe tener 10 caracteres para personas naturales');
    } else if (clienteDto.fk_persona === 2 && clienteDto.cedula_ruc.length !== 13) {
      throw new BadRequestException('El RUC debe tener 13 caracteres para personas jurídicas');
    }
    // Crear el cliente si la validación pasa
    const cliente = this.clienteRepository.create(clienteDto);
    return this.clienteRepository.save(cliente);
  }
  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(id_cliente: number): Promise<Cliente> {
    return this.clienteRepository.findOne({where:{id_cliente}});
  }

  async update(id_cliente: number, clienteDto: ClienteDto): Promise<Cliente> {
    // Verificar el tipo de persona y la longitud de cedula_ruc
    if (clienteDto.fk_persona === 1 && clienteDto.cedula_ruc.length !== 10) {
      throw new BadRequestException('La cédula debe tener 10 caracteres para personas naturales');
    } else if (clienteDto.fk_persona === 2 && clienteDto.cedula_ruc.length !== 13) {
      throw new BadRequestException('El RUC debe tener 13 caracteres para personas jurídicas');
    }

    // Buscar el cliente por su ID
    const cliente = await this.clienteRepository.findOne({where:{id_cliente}});
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    // Actualizar el cliente con los nuevos datos
    Object.assign(cliente, clienteDto);
    return this.clienteRepository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
