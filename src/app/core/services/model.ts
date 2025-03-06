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

// TODO: create a folder called models and put each model in one file in main src folder to be visible for everyone, you dont write code for just your own you have many people wtiting code wuth you