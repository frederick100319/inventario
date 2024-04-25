import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seriales } from '../entities/serial.entity';
import { SerialDto } from '../dto/serial.dto';// Asegúrate de importar tu DTO aquí

@Injectable()
export class SerialService {
  constructor(
    @InjectRepository(Seriales)
    private readonly serialRepository: Repository<Seriales>,
  ) {}

  async create(serialData: SerialDto): Promise<Seriales> {
    const serial = this.serialRepository.create(serialData);
    return this.serialRepository.save(serial);
  }

  async findAll(): Promise<Seriales[]> {
    return this.serialRepository.find();
  }

  async findOne(id_serial: number): Promise<Seriales> {
    return this.serialRepository.findOne({where:{id_serial}});
  }

  async update(id_serial: number, serialData: SerialDto): Promise<Seriales> {
    await this.serialRepository.update(id_serial, serialData);
    return this.serialRepository.findOne({where:{id_serial}});
  }

  async remove(id_serial: number): Promise<void> {
    await this.serialRepository.delete(id_serial);
  }
  async getTotalSeriales(): Promise<number> {
    return await this.serialRepository.count();
  }
}

