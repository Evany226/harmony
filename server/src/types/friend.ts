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

export interface Message {
  id: string;
  content: string;
  edited: boolean;
  isAlert: boolean;
  senderId: string;
  conversationId: string;
  createdAt: string;
  sender: User;
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
  guildId: string;
  guild: Guild;
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
