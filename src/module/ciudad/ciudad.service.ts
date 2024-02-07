// ciudad.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CiudadDto } from '../dto/ciudad.dto';
import { Ciudad } from '../entities/ciudad.entity';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  async findAll(): Promise<Ciudad[]> {
    return await this.ciudadRepository.find();
  }

  async create(ciudadDto: CiudadDto): Promise<Ciudad> {
    if (!ciudadDto.nombre) {
      throw new Error('El campo "nombre" es obligatorio para crear una ciudad.');
    }
    const nuevaCiudad = this.ciudadRepository.create(ciudadDto);
    return await this.ciudadRepository.save(nuevaCiudad);
  }

  async update(id_ciudad: number, ciudadDto: CiudadDto): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({where: {id_ciudad}});
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${id_ciudad} no encontrada.`);
    }
    ciudad.nombre = ciudadDto.nombre;

    return await this.ciudadRepository.save(ciudad);
  }

  async remove(id_ciudad: number): Promise<void> {
    const ciudad = await this.ciudadRepository.findOne({where: {id_ciudad}});
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${id_ciudad} no encontrada.`);
    }

    await this.ciudadRepository.remove(ciudad);
  }

  async findById(id_ciudad: number): Promise<Ciudad | null> {
    const ciudad = await this.ciudadRepository.findOne({where: {id_ciudad}});
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${id_ciudad} no se encuentra en la lista.`);
    }
    return await this.ciudadRepository.findOne({where: {id_ciudad}});
  }
}

