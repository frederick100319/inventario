import { Injectable, NotFoundException, BadRequestException, ConflictException} from '@nestjs/common';
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
    return this.proveedorRepository.find({ relations: ['fk_ciudad'] });
  }

  async findOne(ruc: string): Promise<Proveedor | undefined> {
    return this.proveedorRepository.findOne({where: {ruc}, relations: ['fk_ciudad']});
  }

  async getTotalSuppliers(): Promise<number> {
    return await this.proveedorRepository.count();
  }
  
  async create(proveedorDto: ProveedorDto): Promise<Proveedor> {

    if (proveedorDto.ruc.length !== 13) {
        throw new BadRequestException('El RUC debe tener exactamente 13 caracteres.');
    }


    const existingProveedor = await this.proveedorRepository.findOne({ where: { ruc: proveedorDto.ruc } });
    if (existingProveedor) {
        throw new ConflictException('Ya existe un proveedor con el mismo RUC.');
    }


    const proveedor: Partial<Proveedor> = {
        ruc: proveedorDto.ruc,
        empresa: proveedorDto.empresa,
        calle_1: proveedorDto.calle_1,
        nro_casa: proveedorDto.nro_casa,
        calle_2: proveedorDto.calle_2,
        encargado: proveedorDto.encargado,
        nro_encargado: proveedorDto.nro_encargado,
        fk_ciudad: proveedorDto.fk_ciudad,
        disponible: true
    };
    return await this.proveedorRepository.save(proveedor);
}

  

  async update(ruc: string, proveedorDto: ProveedorDto): Promise<Proveedor | undefined> {

    const proveedorExistente = await this.proveedorRepository.findOne({where:{ruc}});
  

    if (!proveedorExistente) {
      throw new Error('Proveedor inexistente') 
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
