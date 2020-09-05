import IQuote from 'src/common/interfaces/models/quote.interface'
import IReceive from 'src/common/interfaces/models/receive.interface'

export default abstract class QuoteReceiveInteractor {
  abstract getRandomQuote(serverId: string): Promise<IGetRandomQuoteOutput>
  abstract createReceiveReceipt(
    input: ICreateReceiveReceiptInput
  ): Promise<ICreateReceiveReceiptOutput>

  async receiveQuote(input: IReceiveQuoteInput) {
    const quote = await this.getRandomQuote(input.serverId)
    const receive = await this.createReceiveReceipt({
      ...input,
      quoteId: quote.quoteId,
    })
    return { quote, receive }
  }
}

export interface IReceiveQuoteInput {
  serverId: string
  channelId: string
  messageId: string
  receiverId: string
}

export interface ICreateReceiveReceiptInput extends IReceiveQuoteInput {
  quoteId: string
}

export interface IRecieveQuoteOutput {
  quote: IQuote
  receive: IReceive
}

export type ICreateReceiveReceiptOutput = IReceive
export type IGetRandomQuoteOutput = IQuote
