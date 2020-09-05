import { Module } from '@nestjs/common'
import { ProvidersModule } from './providers/providers.module'
import { InteractorsModule } from './interactors/interactors.module';
import { HttpDebugModule } from './http-debug/http-debug.module';

@Module({
  imports: [ProvidersModule, InteractorsModule, HttpDebugModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
