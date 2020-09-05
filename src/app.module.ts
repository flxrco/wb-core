import { Module } from '@nestjs/common'
import { ProvidersModule } from './providers/providers.module'
import { InteractorsModule } from './interactors/interactors.module';

@Module({
  imports: [ProvidersModule, InteractorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
