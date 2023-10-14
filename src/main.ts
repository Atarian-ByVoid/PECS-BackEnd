import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('PECS')
    .setDescription('API PECS')
    .setVersion('2.0 - Alpha')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Exportar a documentação do Swagger em formato JSON
  const swaggerJson = JSON.stringify(document);
  writeFileSync(join(__dirname, '../swagger.json'), swaggerJson);

  await app.listen(process.env.PORT);
}
bootstrap();
