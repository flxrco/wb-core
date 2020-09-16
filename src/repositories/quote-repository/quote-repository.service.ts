import { Injectable } from '@nestjs/common'
import QuoteRepository from 'src/common/classes/repositories/quote-repository.class'
import { IBaseQuote } from 'src/common/interfaces/models/quote.interface'
import QuoteModel from 'src/mongoose/models/quote.model'
import shortid = require('shortid')
import ApprovalCause from 'src/common/enums/approval-cause.enum'

@Injectable()
export class QuoteRepositoryService extends QuoteRepository {
  async createQuote(quote: IBaseQuote) {
    const newQuote = await QuoteModel.create({
      ...quote,
      quoteId: shortid(),
    })

    return newQuote.toDto()
  }

  async getRandomQuote(serverId: string) {
    const queryParams = {
      $or: [
        {
          submissionStatus: null,
        },
        {
          'submissionStatus.verdict': { $ne: null },
          'submissionStatus.verdict.cause': {
            $in: [ApprovalCause.REQUIREMENTS_MET, ApprovalCause.FORCE_APPROVAL],
          },
        },
      ],
      serverId,
    }

    const count = await QuoteModel.countDocuments(queryParams).exec()

    if (!count) {
      return null
    }

    const rand = Math.floor(Math.random() * count)

    const quote = await QuoteModel.findOne(queryParams)
      .skip(rand)
      .exec()

    return quote.toDto()
  }
}
