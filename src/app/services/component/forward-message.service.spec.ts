import { TestBed } from '@angular/core/testing';

import { ForwardMessageService } from './forward-message.service';

describe('ForwardMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForwardMessageService = TestBed.get(ForwardMessageService);
    expect(service).toBeTruthy();
  });
});
