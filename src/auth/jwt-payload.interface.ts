import Role from './roles/role-type';

export interface JwtPayload {
  id: string;
  username: string;
  role: Role;
  sessionId?: string;
}
