import { Module } from '@nestjs/common';
import { QuoteSubmitController } from './quote-submit/quote-submit.controller';
import { QuoteReceiveController } from './quote-receive/quote-receive.controller';

@Module({
  controllers: [QuoteSubmitController, QuoteReceiveController]
})
export class ControllersModule {}
