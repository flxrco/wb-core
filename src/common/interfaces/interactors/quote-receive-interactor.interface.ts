import IQuote from '../models/quote.interface'

export default interface QuoteReceiveInteractor {
  receiveQuote: (args: IReceiveQuoteInput) => Promise<IReceiveQuoteOutput>
  receivableQuoteCount: (serverId: string) => Promise<boolean>
}

export interface IReceiveQuoteInput {
  serverId: string
  channelId: string
  messageId: string
  receiverId: string
}

export type IReceiveQuoteOutput = IQuote
