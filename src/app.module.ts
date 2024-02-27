import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { NamespaceModule } from './namespace/namespace.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: Number(process.env.MYSQL_PORT),
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/entities/*.entity{.tx,.js}'],
      synchronize: true,
    }),
    UserModule,
    TaskModule,
    NamespaceModule,
    AuthModule,
  ],
})
export class AppModule {}
