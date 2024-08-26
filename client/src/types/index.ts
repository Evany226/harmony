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
