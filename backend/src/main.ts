import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { connectMongoDB } from './db/mongoose-connection';

async function bootstrap() {
  const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexusai';
  await connectMongoDB(mongodbUri);

  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('NexusAI API').setDescription('AI Model Hub Backend API').setVersion('1.0')
    .addBearerAuth().build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`NexusAI API: http://localhost:${port}/api`);
}
bootstrap();
