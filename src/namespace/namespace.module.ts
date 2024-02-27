import { Module } from '@nestjs/common';
import { NamespaceService } from './namespace.service';
import { NamespaceController } from './namespace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Namespace } from 'src/entities/namespace.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Namespace]), UserModule],
  controllers: [NamespaceController],
  providers: [NamespaceService],
  exports: [NamespaceService],
})
export class NamespaceModule {}
