import { Injectable } from '@nestjs/common'
import QuoteRepository from 'src/common/classes/repositories/quote-repository.class'
import { IBaseQuote } from 'src/common/interfaces/models/quote.interface'
import QuoteModel from 'src/mongoose/models/quote.model'
import IApprovalStatus from 'src/common/interfaces/models/approval-status.interface'

@Injectable()
export class QuoteRepositoryService extends QuoteRepository {
  async createQuote(quote: IBaseQuote) {
    const newQuote = await QuoteModel.create(quote)
    return newQuote.baseData
  }

  async getQuoteById(quoteId: string) {
    const quote = await QuoteModel.findById(quoteId).exec()

    return quote.baseData
  }

  async getQuoteByMessageId(messageId: string) {
    const quote = await QuoteModel.findOne({
      approvalStatus: {
        $ne: null,
      },
      'approvalStatus.messageId': messageId,
    }).exec()

    return quote.baseData
  }

  async getQuoteApprovalStatus(quoteId: string) {
    const { approvalStatus } = await QuoteModel.findById(quoteId)
      .lean()
      .exec()

    return approvalStatus
  }

  async setQuoteApprovalStatus(
    quoteId: string,
    approvalStatus: IApprovalStatus
  ) {
    const quote = await QuoteModel.findById(quoteId).exec()
    quote.approvalStatus = approvalStatus
    await quote.save()
    return quote.approvalStatus
  }

  async getPendingQuotes(serverId: string) {
    const data = await QuoteModel.find({
      approvalStatus: {
        $ne: null,
      },
      'approvalStatus.serverId': serverId,
      'approvalStatus.approveDt': null,
      'approvalStatus.expireDt': {
        $gt: new Date(),
      },
    }).exec()

    return data.map(({ baseData: quote, approvalStatus }) => ({
      quote,
      approvalStatus,
    }))
  }

  async getRandomQuote(serverId: string) {
    const quote = await QuoteModel.findOne({
      approvalStatus: {
        $ne: null,
      },
      'approvalStatus.approveDt': {
        $ne: null,
      },
      'approvalStatus.serverId': serverId,
    }).exec()

    return quote.baseData
  }
}
