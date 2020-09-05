import { Module } from '@nestjs/common'
import { QuoteRepositoryService } from './quote-repository/quote-repository.service'
import { ReceiveRepositoryService } from './receive-repository/receive-repository.service'
import QuoteRepository from 'src/common/classes/repositories/quote-repository.class'
import ReceiveRepository from 'src/common/classes/repositories/receive-repository.class'

@Module({
  providers: [
    {
      provide: QuoteRepository,
      useClass: QuoteRepositoryService,
    },
    {
      provide: ReceiveRepository,
      useClass: ReceiveRepositoryService,
    },
  ],
  exports: [QuoteRepository, ReceiveRepository],
})
export class RepositoriesModule {}
