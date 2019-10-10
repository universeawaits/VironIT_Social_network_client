import { TestBed } from '@angular/core/testing';

import { ContactListProfileBindingService } from './contact-list-profile-binding.service';

describe('ContactListProfileBindingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactListProfileBindingService = TestBed.get(ContactListProfileBindingService);
    expect(service).toBeTruthy();
  });
});
