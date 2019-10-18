import { TestBed } from '@angular/core/testing';

import { MessageContactBindingService } from './message-contact-binding.service';

describe('MessageContactBindingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageContactBindingService = TestBed.get(MessageContactBindingService);
    expect(service).toBeTruthy();
  });
});
