import IQuote from '../models/quote.interface'
import IApprovalStatus from '../models/approval-status.interface'

export default interface IQuoteSubmitInteractor {
  submitQuote: (args: ISubmitQuoteInput) => Promise<ISubmitQuoteOutput>
  approveQuote: (id: string) => Promise<IApproveQuoteOutput>
  getPendingQuotes: (serverId: string) => Promise<IGetPendingQuotesOutput[]>
}

export interface ISubmitQuoteOutput extends IQuote {
  approvalStatus: IApprovalStatus
}

export interface ISubmitQuoteInput extends IQuote {
  serverId: string
  messageId: string
  channelId: string
}

export interface IApproveQuoteOutput extends IQuote {
  approvedAt: Date
}

export type IGetPendingQuotesOutput = ISubmitQuoteOutput
