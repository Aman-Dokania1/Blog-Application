export interface UserResponse {
  accessToken: string;
  tokenType: string;
}

export interface UserDetails {
  name: string;
  username: string;
  profileImage: string;
  email: string;
  roles: [{ name: string }];
}
