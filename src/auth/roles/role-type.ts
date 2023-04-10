const Roles = {
  owner: 'owner',
  tenant: 'tenant',
} as const;

type Role = keyof typeof Roles;

export const RolesArray: Role[] = ['owner', 'tenant'];

export default Role;
