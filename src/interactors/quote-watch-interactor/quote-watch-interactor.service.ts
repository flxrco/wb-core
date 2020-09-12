import { Injectable } from '@nestjs/common'
import {
  QuoteWatchInteractor,
  IPendingQuote,
} from 'src/common/classes/interactors/quote-watch-interactor.class'
import SubmissionRepository from 'src/common/classes/repositories/submission-repository.class'
import InteractorError, {
  InteractorErrorCodes,
} from 'src/common/classes/errors/interactor-error.class'
import ApprovalCause from 'src/common/enums/approval-cause.enum'
import ISubmissionVerdict from 'src/common/interfaces/models/submission-verdict.interface'
import RejectionCause from 'src/common/enums/rejection-cause.enum'

@Injectable()
export class QuoteWatchInteractorService extends QuoteWatchInteractor {
  constructor(private submitRepo: SubmissionRepository) {
    super()
  }

  private async verdictHelper(messageId: string, verdict: ISubmissionVerdict) {
    const pending = await this.submitRepo.findPendingQuotebyMessage(messageId)

    if (!pending) {
      throw new InteractorError(InteractorErrorCodes.PENDING_QUOTE_NOT_FOUND)
    }

    const { quote } = pending

    await this.submitRepo.setSubmissionVerdict(quote.quoteId, verdict)

    const status = await this.submitRepo.getSubmissionStatus(quote.quoteId)
    return {
      submissionStatus: status,
      quote,
    }
  }

  approveByMessageId(messageId: string): Promise<IPendingQuote> {
    return this.verdictHelper(messageId, {
      cause: ApprovalCause.REQUIREMENTS_MET,
      verdictDt: new Date(),
    })
  }

  getPendingQuotes(serverId: string): Promise<IPendingQuote[]> {
    return this.submitRepo.getPendingQuotes(serverId)
  }

  flagAsLost(messageId: string): Promise<IPendingQuote> {
    return this.verdictHelper(messageId, {
      cause: RejectionCause.MESSAGE_LOST,
      verdictDt: new Date(),
    })
  }
}
