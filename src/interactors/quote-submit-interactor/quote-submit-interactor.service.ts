import { Injectable } from '@nestjs/common'
import QuoteSubmitInteractor, {
  ISubmitQuoteInput,
  ISubmitQuoteOutput,
  IApproveQuoteOutput,
  IGetPendingQuotesOutput,
} from 'src/common/classes/interactors/quote-submit-interactor.class'
import QuoteModel from 'src/mongoose/models/quote.model'
import InteractorError, {
  InteractorErrorCodes,
} from 'src/common/classes/errors/interactor-error.class'

@Injectable()
export class QuoteSubmitInteractorService extends QuoteSubmitInteractor {
  async submitQuote(input: ISubmitQuoteInput): Promise<ISubmitQuoteOutput> {
    const quote = await QuoteModel.create({
      ...input,
      approvalStatus: {
        ...input,
      },
    })

    return {
      quote: quote.baseData,
      approvalStatus: quote.approvalStatus,
    }
  }

  async approveQuote(messageId: string): Promise<IApproveQuoteOutput> {
    const quote = await QuoteModel.findOne({
      'approvalStatus.messageId': messageId,
    }).exec()

    if (!quote) {
      throw new InteractorError(InteractorErrorCodes.QUOTE_NOT_FOUND)
    } else if (quote.approvalStatus.approveDt) {
      throw new InteractorError(InteractorErrorCodes.QUOTE_APPROVED)
    } else if (new Date().getTime() > quote.approvalStatus.expireDt.getTime()) {
      throw new InteractorError(InteractorErrorCodes.QUOTE_EXPIRED)
    }

    quote.approvalStatus.approveDt = new Date()
    await quote.save()

    return quote.baseData
  }

  async getPendingQuotes(serverId: string): Promise<IGetPendingQuotesOutput> {
    const quotes = await QuoteModel.find({
      'approvalStatus.serverId': serverId,
      'approvalStatus.expireDt': {
        $gt: new Date(),
      },
      'approvalStatus.approveDt': null,
    }).exec()

    return quotes.map(q => {
      return {
        quote: q.baseData,
        approvalStatus: q.approvalStatus,
      }
    })
  }
}
