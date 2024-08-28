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
  conversationId: string;
  createdAt: string;
  sender: User;
}
