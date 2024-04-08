import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaDto } from '../dto/categoria.dto';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }
  async getTotalCategories(): Promise<number> {
    return await this.categoriaRepository.count();
  }
  async create(categoriaDto: CategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(categoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async update(id_categoria: number, categoriaDto: CategoriaDto): Promise<Categoria> {
    const existingCategoria = await this.categoriaRepository.findOne({where: {id_categoria}});
    if (!existingCategoria) {
      throw new NotFoundException(`Categoría con id ${id_categoria} no encontrada`);
    }
    existingCategoria.nombre = categoriaDto.nombre;
    return await this.categoriaRepository.save(existingCategoria);
  }

  async delete(id_categoria: number): Promise<void> {
    const existingCategoria = await this.categoriaRepository.findOne({ where: { id_categoria } });

    if (!existingCategoria) {
      throw new NotFoundException(`Categoría con id ${id_categoria} no encontrada`);
    }

    await this.categoriaRepository.remove(existingCategoria);
  }
  async findById(id_categoria: number): Promise<Categoria | null> {
    const ciudad = await this.categoriaRepository.findOne({where: {id_categoria}});
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${id_categoria} no se encuentra en la lista.`);
    }
    return await this.categoriaRepository.findOne({where: {id_categoria}});
  }
}
