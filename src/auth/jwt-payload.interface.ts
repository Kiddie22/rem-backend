import Role from './roles/enums/role.enum';

export interface JwtPayload {
  id: string;
  username: string;
  role: Role;
  sessionId?: string;
}
