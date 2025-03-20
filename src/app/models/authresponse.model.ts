export interface AuthResponse {
  verificationToken: string;
  user: {
    email: string;
    name: string;
  };
}
