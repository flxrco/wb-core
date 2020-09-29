import { Injectable } from '@nestjs/common'
import QuoteReceiveInteractor, {
  IReceiveQuoteInput,
  IRecieveQuoteOutput,
} from 'src/common/classes/interactors/quote-receive-interactor.class'
import ReceiveRepository from 'src/common/classes/repositories/receive-repository.class'
import QuoteRepository from 'src/common/classes/repositories/quote-repository.class'
import InteractorError, {
  InteractorErrorCodes,
} from 'src/common/classes/errors/interactor-error.class'

@Injectable()
export class QuoteReceiveInteractorService extends QuoteReceiveInteractor {
  constructor(
    private quoteRepo: QuoteRepository,
    private receiveRepo: ReceiveRepository
  ) {
    super()
  }

  async receiveQuote(input: IReceiveQuoteInput): Promise<IRecieveQuoteOutput> {
    const quote = await this.quoteRepo.getRandomQuote(
      input.serverId,
      input.authorId,
      input.excludeAuthor
    )

    if (!quote) {
      throw new InteractorError(InteractorErrorCodes.NO_AVAILABLE_QUOTES)
    }

    const receive = await this.receiveRepo.createReceive(quote.quoteId, {
      ...input,
      receiveDt: new Date(),
    })

    return {
      quote,
      receive,
    }
  }
}
