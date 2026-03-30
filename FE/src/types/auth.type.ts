
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  userName: string
  token: string;
  expiration: Date,
  gmail: string,
  role: []
}

