import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos } from '../entities/producto.entity';
import { ProductoDto } from '../dto/producto.dto';
import { Proveedor } from '../entities/proveedor.entity';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Productos)
    private readonly productoRepository: Repository<Productos>,
  ) {}

  async create(productoDto: ProductoDto): Promise<Productos> {
      const producto: Partial<Productos>={
      codigo: productoDto.codigo,
      fk_ruc: productoDto.fk_ruc,
      nombre: productoDto.nombre,
      modelo: productoDto.modelo,
      descripcion:productoDto.descripcion,
      fk_categoria:productoDto.fk_categoria,
      cantidad:productoDto.cantidad,
      disponible:productoDto.disponible,
      precio_compra:productoDto.precio_compra,
      precio_venta:productoDto.precio_venta,
      foto_url:productoDto.foto_url
    };
      return await this.productoRepository.save(producto);
  }
  async findAll(): Promise<Productos[]> {
    return this.productoRepository.find();
  }

  async findOne(codigo: string): Promise<Productos | undefined> {
    return this.productoRepository.findOne({where: {codigo}});
  }

  async update(codigo: string, productoDto: ProductoDto): Promise<Productos | undefined> {
    const producto = await this.productoRepository.findOne({where: {codigo}});
    if (!producto) {
      return undefined;
    }
    // Asignar los nuevos valores al producto existente
    Object.assign(producto, productoDto);
    return this.productoRepository.save(producto);
  }

  async remove(codigo: string): Promise<Productos | undefined> {
    const producto = await this.productoRepository.findOne({where: {codigo}});
    if (!producto) {
      return undefined;
    }
    await this.productoRepository.remove(producto);
    return producto;
  }
  async getTotalAvailableProducts(): Promise<number> {
    return await this.productoRepository.count({where:{ disponible: true }});
  }
}
