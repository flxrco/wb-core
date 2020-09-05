import { Test, TestingModule } from '@nestjs/testing';
import { QuoteReceiveDebugController } from './quote-receive-debug.controller';

describe('QuoteReceiveDebugController', () => {
  let controller: QuoteReceiveDebugController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteReceiveDebugController],
    }).compile();

    controller = module.get<QuoteReceiveDebugController>(QuoteReceiveDebugController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
