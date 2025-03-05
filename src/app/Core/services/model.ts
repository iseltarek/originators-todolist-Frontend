export interface Note {
  status: string;
  tags: [];
  description: string;
  _id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
}

export interface AuthResponse {
  verificationToken: string;
  user: {
    id: string;
    name: string;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
}
