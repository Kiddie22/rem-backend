export interface JwtPayload {
  id: string;
  username: string;
  hashedKey?: string;
}
