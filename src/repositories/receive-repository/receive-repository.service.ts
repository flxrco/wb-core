import { Injectable } from '@nestjs/common'
import ReceiveRepository from 'src/common/classes/repositories/receive-repository.class'
import IReceive from 'src/common/interfaces/models/receive.interface'
import QuoteModel from 'src/mongoose/models/quote.model'
import shortid = require('shortid')

@Injectable()
export class ReceiveRepositoryService extends ReceiveRepository {
  async createReceive(quoteId: string, receive: IReceive) {
    const quote = await QuoteModel.findOne({ quoteId })

    const newReceive = quote.receives.create({
      ...receive,
      receiveId: shortid(),
    })

    quote.receives.push(newReceive)

    await quote.save()
    return newReceive.toObject() as IReceive
  }
}
