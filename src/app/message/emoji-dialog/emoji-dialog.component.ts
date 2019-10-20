import { Component, OnInit } from '@angular/core';
import { EmojiIntoMessageService } from 'src/app/services/component/emoji-into-message.service';

@Component({
  selector: 'app-emoji-dialog',
  templateUrl: './emoji-dialog.component.html',
  styleUrls: ['./emoji-dialog.component.scss']
})
export class EmojiDialogComponent implements OnInit {
  emojis: string[] = [
    '️‍🌈', '️‍🔔', '👨‍💻', '️‍✔️', '️‍⚜️', '️‍❤️', '️‍🧡', '💚', '️‍💛', '️‍💙',
    '️‍💜', '🖤', '️‍💔', '️‍💕', '️‍💖', '️‍✏️', '️‍🔍', '️‍📕', '️‍📖',
    '️‍📐', '️‍📌', '️‍✉️', '️‍🎉', '️‍🎁', '️‍🎈', '️‍🔑', '️‍💸', '️‍🚎',
    '️‍🚀', '️‍🌃', '️‍🚲', '️‍🚕', '️‍🎹', '️‍⚽️', '️‍🍺', '️‍🍷', '️‍🍉',
    '️‍🍭', '️‍🍔', '️‍🐯', '️‍🐷', '️‍🙂', '️‍🤣', '️‍😊', '️‍😎', '️‍😘',
    '️‍😰', '️‍🤔', '️‍😏' , '️‍💀', '️‍😳'
  ];

  constructor(
    private emojiService: EmojiIntoMessageService
  ) { }

  ngOnInit() { }

  addEmoji(emoji: string) {
    this.emojiService.addEmoji(emoji);
  }
}
