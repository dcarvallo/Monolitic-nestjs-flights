import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filter/http-exception.filter';
import { TimeOutInterceptor } from './common/filter/interceptors/timeout.interceptor';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder().setTitle('FLights API')
    .setDescription('Scheduled FLight App')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app,options);

  SwaggerModule.setup('/api/docs',app,document,{
    swaggerOptions: {
      filter: true
    }
  })

  await app.listen(3000);
}
bootstrap();
