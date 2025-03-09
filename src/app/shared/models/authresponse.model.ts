export interface AuthResponse {
  verificationToken: string;
  user: {
    id: string;
    name: string;
  };
}
