import { Controller } from '@nestjs/common'
import { QuoteReceiveInteractorService } from 'src/interactors/quote-receive-interactor/quote-receive-interactor.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import MicroserviceMessages from 'src/common/enums/microservice-messages.enum'
import { IReceiveQuoteInput } from 'src/common/classes/interactors/quote-receive-interactor.class'

@Controller()
export class QuoteReceiveController {
  constructor(private interactor: QuoteReceiveInteractorService) {}

  @MessagePattern(MicroserviceMessages.RECEIVE_QUOTE)
  async receiveQuote(@Payload() input: IReceiveQuoteInput) {
    return await this.interactor.receiveQuote(input)
  }
}
