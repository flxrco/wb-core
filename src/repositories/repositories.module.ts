import { Module } from '@nestjs/common';
import { QuoteRepositoryService } from './quote-repository/quote-repository.service';

@Module({
  providers: [QuoteRepositoryService]
})
export class RepositoriesModule {}
