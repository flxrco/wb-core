import { Test, TestingModule } from '@nestjs/testing';
import { QuoteSubmitDebugController } from './quote-submit-debug.controller';

describe('QuoteSubmitDebugController', () => {
  let controller: QuoteSubmitDebugController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteSubmitDebugController],
    }).compile();

    controller = module.get<QuoteSubmitDebugController>(QuoteSubmitDebugController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
