import { Controller, Body, Put, Post, Param, Get, Query } from '@nestjs/common'
import { ISubmitQuoteInput } from 'src/common/classes/interactors/quote-submit-interactor.class'
import { QuoteSubmitInteractorService } from 'src/interactors/quote-submit-interactor/quote-submit-interactor.service'

@Controller('debug/submit')
export class QuoteSubmitDebugController {
  constructor(private interactor: QuoteSubmitInteractorService) {}

  @Post()
  async submitQuote(@Body() input: ISubmitQuoteInput) {
    return await this.interactor.submitQuote(input)
  }

  @Put(':messageId')
  async approveQuote(@Param('messageId') messageId: string) {
    return await this.interactor.approveQuote(messageId)
  }

  @Get()
  async getPendingQuotes(@Query('serverId') serverId: string) {
    return await this.interactor.getPendingQuotes(serverId)
  }
}
