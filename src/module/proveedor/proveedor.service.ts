import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from '../entities/proveedor.entity';
import { ProveedorDto } from '../dto/proveedor.dto';
import { Ciudad } from '../entities/ciudad.entity';

@Injectable()
export class ProveedorService {
    constructor(
      @InjectRepository(Proveedor)
      private readonly proveedorRepository: Repository<Proveedor>,
      @InjectRepository(Ciudad)
      private readonly ciudadRepository: Repository<Ciudad>,
    ) {}

  async findAll(): Promise<Proveedor[]> {
    return this.proveedorRepository.find();
  }

  async findOne(ruc: string): Promise<Proveedor | undefined> {
    return this.proveedorRepository.findOne({where: {ruc}});
  }

  
  async create(proveedorDto: ProveedorDto): Promise<Proveedor> {
    const proveedor: Partial<Proveedor> = {
      ruc: proveedorDto.ruc,
      empresa: proveedorDto.empresa,
      calle_1: proveedorDto.calle_1,
      nro_casa: proveedorDto.nro_casa,
      calle_2: proveedorDto.calle_2,
      encargado: proveedorDto.encargado,
      nro_encargado: proveedorDto.nro_encargado,
      fk_ciudad: proveedorDto.fk_ciudad,
      disponible: proveedorDto.disponible
    };
    return await this.proveedorRepository.save(proveedor);
  }
  

  async update(ruc: string, proveedorDto: ProveedorDto): Promise<Proveedor | undefined> {
    // Buscar el proveedor por su ruc
    const proveedorExistente = await this.proveedorRepository.findOne({where:{ruc}});
  
    // Verificar si el proveedor existe
    if (!proveedorExistente) {
      throw new Error('Proveedor inexistente') // O lanzar un error adecuado
    }
    proveedorExistente.empresa = proveedorDto.empresa;
    proveedorExistente.calle_1 = proveedorDto.calle_1;
    proveedorExistente.nro_casa = proveedorDto.nro_casa;
    proveedorExistente.calle_2 = proveedorDto.calle_2;
    proveedorExistente.encargado = proveedorDto.encargado;
    proveedorExistente.nro_encargado = proveedorDto.nro_encargado;
    proveedorExistente.fk_ciudad=proveedorDto.fk_ciudad
    proveedorExistente.disponible=proveedorDto.disponible
    await this.proveedorRepository.save(proveedorExistente);
    return proveedorExistente;
  }
  

  async remove(ruc: string): Promise<Proveedor> {
    const proveedorExistente = await this.proveedorRepository.findOne({ where: { ruc } });
    if (!proveedorExistente) {
      throw new Error(`Proveedor con RUC ${ruc} no encontrado`);
    }
    await this.proveedorRepository.delete(ruc);
    return 
  }
  
}
