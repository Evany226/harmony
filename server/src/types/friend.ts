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
