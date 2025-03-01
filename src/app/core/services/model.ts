export interface Note {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

// AuthenticationResponse
export interface AuthResponse {
  verificationToken: string;
  user: {
    id: string;
    name: string;
  };
}
