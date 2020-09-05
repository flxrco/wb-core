import { Module } from '@nestjs/common'
import { ProvidersModule } from './providers/providers.module'
import { InteractorsModule } from './interactors/interactors.module'
import { RepositoriesModule } from './repositories/repositories.module'
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [ProvidersModule, InteractorsModule, RepositoriesModule, ControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
