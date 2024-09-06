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
}

export interface Conversation {
  id: string;
  createdAt: string;
  users: User[];
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: User;
  conversationId: string;
  createdAt: string;
}

export interface Guild {
  id: string;
  name: string;
  ownerId: string;
  owner: User;
  members: Member[];
  textChannels: TextChannel[];
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
  guildId: string;
  guild: Guild;
  createdAt: string;
}
