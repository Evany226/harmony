export interface Friend {
  requestId: string;
  id: string;
  username: string;
  hasImage: boolean;
  imageUrl: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  hasImage: boolean;
  imageUrl: string;
  participants: Participant[];
  guilds: Guild[];
  members: Member[];
  guildRequests: GuildRequest[];
}

export interface Conversation {
  id: string;
  createdAt: string;
  participants: Participant[];
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
  senderId: string;
  sender: Participant;
  conversationId: string;
  createdAt: string;
}

export interface Guild {
  id: string;
  name: string;
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

export interface TextChannel {
  id: string;
  name: string;
  topic: string;
  guildId: string;
  guild: Guild;
  messages: ChannelMessages[];
  createdAt: string;
}

export interface ChannelMessages {
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

export interface GuildRequest {
  id: string;
  status: "pending" | "confirmed";
  toUserId: string;
  fromGuildId: string;
  fromGuild: Guild;
}
