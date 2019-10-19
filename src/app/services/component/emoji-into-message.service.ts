import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmojiIntoMessageService {
  emojiSelected = new EventEmitter<string>();

  constructor() { }

  addEmoji(emoji: string) {
    this.emojiSelected.emit(emoji);
  }
}
