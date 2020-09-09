import IApprovalStatus from 'src/common/interfaces/models/approval-status.interface'
import IQuote, {
  IBaseQuote,
} from 'src/common/interfaces/models/quote.interface'

export default abstract class QuoteSubmitInteractor {
  abstract submitQuote(input: ISubmitQuoteInput): Promise<ISubmitQuoteOutput>
  abstract approveQuote(messageId: string): Promise<IApproveQuoteOutput>
  abstract getPendingQuotes(serverId: string): Promise<IGetPendingQuotesOutput>
}

export interface ISubmitQuoteOutput {
  quote: IQuote
  approvalStatus: IApprovalStatus
}

export interface ISubmitQuoteInput extends IBaseQuote {
  serverId: string
  messageId: string
  channelId: string
  expireDt: Date
}

export type IApproveQuoteOutput = IQuote
export type IGetPendingQuotesOutput = ISubmitQuoteOutput[]
export type IFindQuoteByMessageIdOutput = IQuote
