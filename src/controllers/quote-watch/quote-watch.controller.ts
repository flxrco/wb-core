import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import MicroserviceMessages from 'src/common/enums/microservice-messages.enum'
import { QuoteWatchInteractorService } from 'src/interactors/quote-watch-interactor/quote-watch-interactor.service'

@Controller()
export class QuoteWatchController {
  constructor(private interactor: QuoteWatchInteractorService) {}
  @MessagePattern(MicroserviceMessages.GET_PENDING_QUOTES)
  async getPendingQuotes(@Payload() serverId: string) {
    return await this.interactor.getPendingQuotes(serverId)
  }

  @MessagePattern(MicroserviceMessages.APPROVE_QUOTE)
  async approveQuote(@Payload() messageId: string) {
    return await this.interactor.approveByMessageId(messageId)
  }
}
