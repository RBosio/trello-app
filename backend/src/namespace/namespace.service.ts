import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Namespace } from 'src/entities/namespace.entity';
import { CreateNamespaceDto } from './dto/create-namespace.dto';
import { UpdateNamespaceDto } from './dto/update-namespace.dto';

@Injectable()
export class NamespaceService {
  constructor(
    @InjectRepository(Namespace)
    private namespaceRepository: Repository<Namespace>,
  ) {}

  async create(createNamespaceDto: CreateNamespaceDto): Promise<Namespace> {
    const namespace = this.namespaceRepository.create(createNamespaceDto);

    return this.namespaceRepository.save(namespace);
  }

  async findAll(): Promise<Namespace[]> {
    return this.namespaceRepository.find({
      relations: {
        tasks: true,
      },
    });
  }

  async findOne(id: number): Promise<Namespace> {
    const namespace = await this.namespaceRepository.findOne({
      where: {
        id,
      },
      relations: {
        tasks: true,
      },
    });

    if (!namespace) {
      throw new HttpException('Namespace not found', HttpStatus.NOT_FOUND);
    }

    return namespace;
  }

  async update(
    id: number,
    updateNamespaceDto: UpdateNamespaceDto,
  ): Promise<Namespace> {
    const namespace = await this.findOne(id);

    const namespaceUpdated = Object.assign(namespace, updateNamespaceDto);

    return this.namespaceRepository.save(namespaceUpdated);
  }

  async remove(id: number) {
    const namespace = await this.findOne(id);
    await this.namespaceRepository.delete(id);

    return namespace;
  }
}
