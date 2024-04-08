import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from '../entities/venta.entity';
import { VentaDto } from '../dto/venta.dto';
import { plainToClass } from 'class-transformer'; 

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
  ) {}

  async create(ventaDto: VentaDto): Promise<Venta> {

    if (ventaDto.fecha_venta > new Date()) {
      throw new BadRequestException('La fecha de venta no puede ser en el futuro');
    }
    const venta = plainToClass(Venta, ventaDto);
    return this.ventaRepository.save(venta);
  }

  async findAll(): Promise<Venta[]> {
    return this.ventaRepository.find({ relations: ['fk_codigo', 'fk_cliente'] });
  }

  async findOne(id_venta: number): Promise<Venta | undefined> {
    return this.ventaRepository.findOne({where:{id_venta}, relations: ['fk_codigo', 'fk_cliente'] } );
  }

  async getTotalDeals(): Promise<number> {
    return await this.ventaRepository.count();
  }

  async update(id_venta: number, ventaDto: VentaDto): Promise<Venta | undefined> {
    const venta = await this.ventaRepository.findOne({where:{id_venta}});
    if (!venta) {
      return undefined;
    }
    Object.assign(venta, ventaDto);
    return this.ventaRepository.save(venta);
  }

  async remove(id_venta: number): Promise<Venta | undefined> {
    const venta = await this.ventaRepository.findOne({where:{id_venta}});
    if (!venta) {
      return undefined;
    }
    await this.ventaRepository.remove(venta);
    return venta;
  }
}

