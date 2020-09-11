import { Module } from '@nestjs/common'
import { QuoteRepositoryService } from './quote-repository/quote-repository.service'
import { ReceiveRepositoryService } from './receive-repository/receive-repository.service'
import { SubmissionRepositoryService } from './submission-repository/submission-repository.service'
import QuoteRepository from 'src/common/classes/repositories/quote-repository.class'
import ReceiveRepository from 'src/common/classes/repositories/receive-repository.class'
import SubmissionRepository from 'src/common/classes/repositories/submission-repository.class'

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
    {
      provide: SubmissionRepository,
      useClass: SubmissionRepositoryService,
    },
  ],
  exports: [QuoteRepository, ReceiveRepository, SubmissionRepository],
})
export class RepositoriesModule {}
