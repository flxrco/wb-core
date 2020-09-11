import { Injectable } from '@nestjs/common'
import QuoteRepository from 'src/common/classes/repositories/quote-repository.class'
import { IBaseQuote } from 'src/common/interfaces/models/quote.interface'
import QuoteModel from 'src/mongoose/models/quote.model'
import shortid = require('shortid')

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
      approvalStatus: {
        $ne: null,
      },
      'approvalStatus.approveDt': {
        $ne: null,
      },
      'approvalStatus.serverId': serverId,
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
