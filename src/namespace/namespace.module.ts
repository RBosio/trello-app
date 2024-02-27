import { Module } from '@nestjs/common';
import { NamespaceService } from './namespace.service';
import { NamespaceController } from './namespace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Namespace } from 'src/entities/namespace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Namespace])],
  controllers: [NamespaceController],
  providers: [NamespaceService],
})
export class NamespaceModule {}
