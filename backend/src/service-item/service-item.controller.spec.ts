import { Test, TestingModule } from '@nestjs/testing';
import { ServiceItemController } from './service-item.controller';
import { ServiceItemService } from './service-item.service';

describe('ServiceItemController', () => {
  let controller: ServiceItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceItemController],
      providers: [ServiceItemService],
    }).compile();

    controller = module.get<ServiceItemController>(ServiceItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
