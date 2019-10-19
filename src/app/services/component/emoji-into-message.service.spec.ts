import { TestBed } from '@angular/core/testing';

import { EmojiIntoMessageService } from './emoji-into-message.service';

describe('EmojiIntoMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmojiIntoMessageService = TestBed.get(EmojiIntoMessageService);
    expect(service).toBeTruthy();
  });
});
