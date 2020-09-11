import { Test, TestingModule } from '@nestjs/testing';
import { QuoteWatchController } from './quote-watch.controller';

describe('QuoteWatchController', () => {
  let controller: QuoteWatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteWatchController],
    }).compile();

    controller = module.get<QuoteWatchController>(QuoteWatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
