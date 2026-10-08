import { Test, TestingModule } from '@nestjs/testing';
import { CustomEnquiriesService } from './custom-enquiries.service.js';

describe('CustomEnquiriesService', () => {
  let service: CustomEnquiriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomEnquiriesService],
    }).compile();

    service = module.get<CustomEnquiriesService>(CustomEnquiriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
