export interface AuthResponse {
  verificationToken: string;
  user: {
    email: string;
    username: string;
  };
}
