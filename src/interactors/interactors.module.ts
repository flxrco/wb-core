import { Module } from '@nestjs/common'
import { QuoteSubmitInteractorService } from './quote-submit-interactor/quote-submit-interactor.service'
import { RepositoriesModule } from 'src/repositories/repositories.module'
import { QuoteReceiveInteractorService } from './quote-receive-interactor/quote-receive-interactor.service'
import { QuoteWatchInteractorService } from './quote-watch-interactor/quote-watch-interactor.service'

@Module({
  providers: [
    QuoteSubmitInteractorService,
    QuoteReceiveInteractorService,
    QuoteWatchInteractorService,
  ],
  exports: [
    QuoteSubmitInteractorService,
    QuoteReceiveInteractorService,
    QuoteWatchInteractorService,
  ],
  imports: [RepositoriesModule],
})
export class InteractorsModule {}
