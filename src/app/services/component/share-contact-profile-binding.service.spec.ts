import { TestBed } from '@angular/core/testing';

import { ShareContactProfileBindingService } from './share-contact-profile-binding.service';

describe('ShareContactProfileBindingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareContactProfileBindingService = TestBed.get(ShareContactProfileBindingService);
    expect(service).toBeTruthy();
  });
});
