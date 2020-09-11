import { Controller } from '@nestjs/common'
import { ISubmitQuoteInput } from 'src/common/classes/interactors/quote-submit-interactor.class'
import { MessagePattern, Payload } from '@nestjs/microservices'
import MicroserviceMessages from 'src/common/enums/microservice-messages.enum'
import { QuoteSubmitInteractorService } from 'src/interactors/quote-submit-interactor/quote-submit-interactor.service'

@Controller()
export class QuoteSubmitController {
  constructor(private interactor: QuoteSubmitInteractorService) {}

  @MessagePattern(MicroserviceMessages.SUBMIT_QUOTE)
  async submitQuote(@Payload() input: ISubmitQuoteInput) {
    return await this.interactor.submitQuote(input)
  }
}
