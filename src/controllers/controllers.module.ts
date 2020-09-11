import { Module } from '@nestjs/common'
import { QuoteSubmitController } from './quote-submit/quote-submit.controller'
import { QuoteReceiveController } from './quote-receive/quote-receive.controller'
import { InteractorsModule } from 'src/interactors/interactors.module'
import { QuoteWatchController } from './quote-watch/quote-watch.controller';

@Module({
  controllers: [QuoteSubmitController, QuoteReceiveController, QuoteWatchController],
  imports: [InteractorsModule],
})
export class ControllersModule {}
