import { Injectable } from '@nestjs/common'
import QuoteSubmitInteractor, {
  ISubmitQuoteInput,
} from 'src/common/classes/interactors/quote-submit-interactor.class'
import QuoteRepository from 'src/common/classes/repositories/quote-repository.class'
import SubmissionRepository from 'src/common/classes/repositories/submission-repository.class'
import { IPendingQuote } from 'src/common/classes/interactors/quote-watch-interactor.class'

@Injectable()
export class QuoteSubmitInteractorService extends QuoteSubmitInteractor {
  constructor(
    private quoteRepo: QuoteRepository,
    private submitRepo: SubmissionRepository
  ) {
    super()
  }

  async submitQuote(input: ISubmitQuoteInput): Promise<IPendingQuote> {
    const quote = await this.quoteRepo.createQuote(input)

    const submissionStatus = await this.submitRepo.setSubmissionStatus(
      quote.quoteId,
      {
        ...input,
        messageDt: new Date(),
        requirements: input,
      }
    )

    return {
      quote,
      submissionStatus,
    }
  }
}
