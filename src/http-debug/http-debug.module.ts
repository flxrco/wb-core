import { Module } from '@nestjs/common'
import { QuoteSubmitDebugController } from './quote-submit-debug/quote-submit-debug.controller'
import { InteractorsModule } from 'src/interactors/interactors.module'
import { QuoteReceiveDebugController } from './quote-receive-debug/quote-receive-debug.controller';

@Module({
  controllers: [QuoteSubmitDebugController, QuoteReceiveDebugController],
  imports: [InteractorsModule],
})
export class HttpDebugModule {}
