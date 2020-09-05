import { Injectable } from '@nestjs/common'
import QuoteSubmitInteractor, {
  ISubmitQuoteInput,
  ISubmitQuoteOutput,
  IApproveQuoteOutput,
  IGetPendingQuotesOutput,
} from 'src/common/classes/interactors/quote-submit-interactor.class'
import InteractorError, {
  InteractorErrorCodes,
} from 'src/common/classes/errors/interactor-error.class'
import QuoteRepository from 'src/common/classes/repositories/quote-repository.class'

@Injectable()
export class QuoteSubmitInteractorService extends QuoteSubmitInteractor {
  constructor(private quoteRepo: QuoteRepository) {
    super()
  }

  async submitQuote(input: ISubmitQuoteInput): Promise<ISubmitQuoteOutput> {
    const quote = await this.quoteRepo.createQuote(input)
    const approvalStatus = await this.quoteRepo.setQuoteApprovalStatus(
      quote.quoteId,
      input
    )

    return {
      quote,
      approvalStatus,
    }
  }

  async approveQuote(messageId: string): Promise<IApproveQuoteOutput> {
    const quote = await this.quoteRepo.getQuoteByMessageId(messageId)

    if (!quote) {
      throw new InteractorError(InteractorErrorCodes.QUOTE_NOT_FOUND)
    }

    const { quoteId } = quote
    console.debug(quote)
    const approvalStatus = await this.quoteRepo.getQuoteApprovalStatus(quoteId)

    if (approvalStatus.approveDt) {
      throw new InteractorError(InteractorErrorCodes.QUOTE_APPROVED)
    } else if (new Date().getTime() > approvalStatus.expireDt.getTime()) {
      throw new InteractorError(InteractorErrorCodes.QUOTE_EXPIRED)
    }

    approvalStatus.approveDt = new Date()
    await this.quoteRepo.setQuoteApprovalStatus(quoteId, approvalStatus)

    return quote
  }

  async getPendingQuotes(serverId: string): Promise<IGetPendingQuotesOutput> {
    return await this.quoteRepo.getPendingQuotes(serverId)
  }
}
