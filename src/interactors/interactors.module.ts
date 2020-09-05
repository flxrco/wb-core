import { Module } from '@nestjs/common'
import { QuoteSubmitInteractorService } from './quote-submit-interactor/quote-submit-interactor.service'
import { RepositoriesModule } from 'src/repositories/repositories.module'

@Module({
  providers: [QuoteSubmitInteractorService],
  exports: [QuoteSubmitInteractorService],
  imports: [RepositoriesModule],
})
export class InteractorsModule {}
