import { Module } from '@nestjs/common'
import { MongooseProvider } from './mongoose.provider'

@Module({
  providers: [MongooseProvider],
})
export class ProvidersModule {}
