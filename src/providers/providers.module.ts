import { Module } from '@nestjs/common';
import { MongooseService } from './mongoose/mongoose.service';

@Module({
  providers: [MongooseService]
})
export class ProvidersModule {}
