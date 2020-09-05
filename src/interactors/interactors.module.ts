import { Module } from '@nestjs/common'
import { QuoteSubmitInteractorService } from './quote-submit-interactor/quote-submit-interactor.service'
import { RepositoriesModule } from 'src/repositories/repositories.module'
import { QuoteReceiveInteractorService } from './quote-receive-interactor/quote-receive-interactor.service'

@Module({
  providers: [QuoteSubmitInteractorService, QuoteReceiveInteractorService],
  exports: [QuoteSubmitInteractorService, QuoteReceiveInteractorService],
  imports: [RepositoriesModule],
})
export class InteractorsModule {}
