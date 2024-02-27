import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Trello App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Running API in MODE ${process.env.NODE_ENV} on Port: ${PORT}`);
  });
}
bootstrap();
