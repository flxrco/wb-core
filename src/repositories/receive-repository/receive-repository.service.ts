import { Injectable } from '@nestjs/common'
import ReceiveRepository from 'src/common/classes/repositories/receive-repository.class'
import IReceive from 'src/common/interfaces/models/receive.interface'
import QuoteModel from 'src/mongoose/models/quote.model'

@Injectable()
export class ReceiveRepositoryService extends ReceiveRepository {
  async createReceive(quoteId: string, receive: IReceive) {
    const quote = await QuoteModel.findById(quoteId)

    const newReceive = quote.receives.create(receive)
    quote.receives.push(newReceive)

    await quote.save()
    return newReceive.toObject() as IReceive
  }
}
