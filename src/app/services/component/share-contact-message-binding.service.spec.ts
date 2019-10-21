import { TestBed } from '@angular/core/testing';

import { ShareContactMessageBindingService } from './share-contact-message-binding.service';

describe('ShareContactMessageBindingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareContactMessageBindingService = TestBed.get(ShareContactMessageBindingService);
    expect(service).toBeTruthy();
  });
});
