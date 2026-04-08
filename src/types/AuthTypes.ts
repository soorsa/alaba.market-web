export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  password2?: string;
  first_name: string;
  last_name: string;
}
