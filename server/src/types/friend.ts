export interface Friend {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: string | null; //get rid of null when u update database, rn database has status as String? meaning its optional
}

export interface User {
  id: string;
  email: string;
  username: string;
  hasImage: boolean;
  imageUrl: string;
}

export interface Conversation {
  id: string;
  createdAt: string;
  users: User[];
}

export interface Participant {
  id: string;

  userId: string;
  user: User;

  conversationId: string;
  conversation: Conversation;
  sentMessages: Message[];
  lastViewed: string;
}

export interface Message {
  id: string;
  content: string;
  edited: boolean;
  isAlert: boolean;
  senderId?: string;
  sender?: Participant;
  conversationId: string;
  createdAt: string;
}

export interface Guild {
  id: string;
  name: string;
  imageUrl: string;
  ownerId: string;
  owner: User;
  members: Member[];
  categories: Category[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  guildId: string;
  guild: Guild;
  channels: TextChannel[];
  createdAt: string;
}

export interface TextChannel {
  id: string;
  name: string;
  topic: string;
  isVoice: boolean;
  categoryId: string;
  category: Category;
  messages: ChannelMessage[];
  createdAt: string;
}

enum MemberRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface Member {
  id: string;
  role: MemberRole;
  userId: string;
  user: User;
  guildId: string;
  guild: Guild;
}

export interface ChannelMessage {
  id: string;
  content: string;
  edited: boolean;
  isAlert: boolean;
  senderId: string;
  sender: Member;
  channelId: string;
  channel: TextChannel;
  createdAt: string;
}

export interface VoiceChannelUser {
  username: string;
  imageUrl?: string;
  isSpeaking?: boolean;
  isMuted?: boolean;
}

export interface ActiveVoiceChannel {
  channelId: string;
  participants: VoiceChannelUser[];
}

interface PayloadEmail {
  createdAt: number;
  email_address: string;
  id: string;
}

export interface WebhookEvent {
  data: {
    id: string;
    type: string;
    email_addresses: PayloadEmail[];
    username: string;
    has_image: boolean;
    image_url: string;
    // You can add more properties as necessary, depending on the payload structure
  };
  object: string;
  timestamp: number;
  type: string;
}
