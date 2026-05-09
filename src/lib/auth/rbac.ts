export const roles = ["OWNER", "ADMIN", "LAWYER", "PARALEGAL", "CLIENT"] as const;

export type Role = (typeof roles)[number];

export type Permission =
  | "cases:read"
  | "cases:write"
  | "files:read"
  | "files:write"
  | "settings:manage"
  | "users:manage";

const rolePermissions: Record<Role, Permission[]> = {
  OWNER: ["cases:read", "cases:write", "files:read", "files:write", "settings:manage", "users:manage"],
  ADMIN: ["cases:read", "cases:write", "files:read", "files:write", "settings:manage", "users:manage"],
  LAWYER: ["cases:read", "cases:write", "files:read", "files:write"],
  PARALEGAL: ["cases:read", "files:read", "files:write"],
  CLIENT: ["cases:read", "files:read"]
};

export function hasPermission(role: Role, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export function parseRole(value: unknown): Role {
  if (typeof value === "string" && roles.includes(value as Role)) {
    return value as Role;
  }

  return "CLIENT";
}
