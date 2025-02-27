export interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  profilePicture: string;
  conversations: Conversation[];
}

export interface APIError {
  statusCode: number;
  message: string;
  data: unknown;
}

export interface ValidationError {
  location: string;
  msg: string;
  type: string;
  value: string;
}

export interface Conversation {
  userId: string;
  conversationId: string;
  messages: MessageType[];
  createdAt: Date;
}

export interface APIResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  gender: string;
}

export interface MessageType {
  id: string;
  message: string;
  createdAt: string;
  conversationId: string;
  type: "SYSTEM" | "USER";
}

/*
export interface MessageType {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: string;
}
*/
