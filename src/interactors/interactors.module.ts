import { Module } from '@nestjs/common';
import { QuoteSubmitInteractorService } from './quote-submit-interactor/quote-submit-interactor.service';

@Module({
  providers: [QuoteSubmitInteractorService]
})
export class InteractorsModule {}
