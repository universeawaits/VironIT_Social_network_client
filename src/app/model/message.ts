import { MessageMedia } from './message-media';

export class Message {
    fromEmail: string;
    toEmail: string;
    dateTime: Date;
    text: string;
    forwardFromEmail: string;
    type: string;
    messageMedia: MessageMedia;
}