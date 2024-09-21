import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('API DOCS')
    .setVersion('1.0.0')
    .addBearerAuth({
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

    const document = SwaggerModule.createDocument(app, config);
  
    // Swagger UI Configuration
    const uiOptions = {
      swaggerOptions: {
        requestInterceptor: (req) => {
          const token = req.headers['Authorization'];
          if (token) {
            req.headers['Authorization'] = token;
          }
          return req;
        },
      },
    };
  
    SwaggerModule.setup('api', app, document, uiOptions);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5000;
  await app.listen(port);
}
bootstrap();
