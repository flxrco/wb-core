import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import 'dotenv-defaults/config'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        url: process.env.MQ_URI,
      },
    }
  )
  app.listen(() => console.log('Microservice is listening'))
}
bootstrap()
