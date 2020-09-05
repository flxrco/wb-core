import { Controller, Get, Param, Body } from '@nestjs/common'
import { QuoteReceiveInteractorService } from 'src/interactors/quote-receive-interactor/quote-receive-interactor.service'

@Controller('debug/receive')
export class QuoteReceiveDebugController {
  constructor(private interactor: QuoteReceiveInteractorService) {}

  @Get(':serverId')
  async receiveQuote(
    @Param('serverId') serverId: string,
    @Body() body: IReceiveQuoteBody
  ) {
    return await this.interactor.receiveQuote({
      serverId,
      ...body,
    })
  }
}

interface IReceiveQuoteBody {
  receiverId: string
  channelId: string
  messageId: string
}
