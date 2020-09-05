import { Module } from '@nestjs/common'
import { QuoteRepositoryService } from './quote-repository/quote-repository.service'
import QuoteRepository from 'src/common/classes/repositories/quote-repository.class'

@Module({
  providers: [
    {
      provide: QuoteRepository,
      useExisting: QuoteRepositoryService,
      useClass: QuoteRepositoryService,
    },
  ],
  exports: [QuoteRepository],
})
export class RepositoriesModule {}
