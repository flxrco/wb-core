import IApprovalStatus from 'src/interfaces/business-models/approval-status.interface'
import IQuote from 'src/interfaces/business-models/quote.interface'

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
