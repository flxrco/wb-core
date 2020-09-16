import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import {
  IGetPendingQuoteParams,
  IPendingQuote,
  QuoteWatchInteractor,
} from 'src/common/classes/interactors/quote-watch-interactor.class'
import MicroserviceMessages from 'src/common/enums/microservice-messages.enum'
import { QuoteWatchInteractorService } from 'src/interactors/quote-watch-interactor/quote-watch-interactor.service'

@Controller()
export class QuoteWatchController extends QuoteWatchInteractor {
  constructor(private interactor: QuoteWatchInteractorService) {
    super()
  }

  @MessagePattern(MicroserviceMessages.GET_PENDING_QUOTES)
  async getPendingQuotes(@Payload() params: IGetPendingQuoteParams) {
    return await this.interactor.getPendingQuotes(params)
  }

  @MessagePattern(MicroserviceMessages.APPROVE_QUOTE)
  async approveByMessageId(@Payload() messageId: string) {
    return await this.interactor.approveByMessageId(messageId)
  }

  @MessagePattern(MicroserviceMessages.FLAG_AS_LOST)
  async flagAsLost(messageId: string): Promise<IPendingQuote> {
    return await this.interactor.flagAsLost(messageId)
  }
}
