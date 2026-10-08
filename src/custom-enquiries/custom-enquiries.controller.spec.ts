import { Test, TestingModule } from '@nestjs/testing';
import { CustomEnquiriesController } from './custom-enquiries.controller.js';

describe('CustomEnquiriesController', () => {
  let controller: CustomEnquiriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomEnquiriesController],
    }).compile();

    controller = module.get<CustomEnquiriesController>(CustomEnquiriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
