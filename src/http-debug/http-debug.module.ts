import { Module } from '@nestjs/common'
import { QuoteSubmitDebugController } from './quote-submit-debug/quote-submit-debug.controller'
import { InteractorsModule } from 'src/interactors/interactors.module'

@Module({
  controllers: [QuoteSubmitDebugController],
  imports: [InteractorsModule],
})
export class HttpDebugModule {}
