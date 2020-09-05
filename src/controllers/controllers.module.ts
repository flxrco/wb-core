import { Module } from '@nestjs/common'
import { QuoteSubmitController } from './quote-submit/quote-submit.controller'
import { QuoteReceiveController } from './quote-receive/quote-receive.controller'
import { InteractorsModule } from 'src/interactors/interactors.module'

@Module({
  controllers: [QuoteSubmitController, QuoteReceiveController],
  imports: [InteractorsModule],
})
export class ControllersModule {}
