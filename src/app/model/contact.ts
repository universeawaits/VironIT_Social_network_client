import { UserProfile } from './user.profile';

export class Contact {
    user: UserProfile;
    pseudonym: string;
    
    isBlocked: boolean;
    isContact: boolean;
    isOnline: boolean;
    lastSeen: string;
}