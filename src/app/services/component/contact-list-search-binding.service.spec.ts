import { TestBed } from '@angular/core/testing';

import { ContactListSearchBindingService } from './contact-list-search-binding.service';

describe('ContactListSearchBindingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactListSearchBindingService = TestBed.get(ContactListSearchBindingService);
    expect(service).toBeTruthy();
  });
});
