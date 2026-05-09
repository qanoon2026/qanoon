import { CognitoJwtVerifier } from "aws-jwt-verify";
import type { CognitoJwtPayload } from "aws-jwt-verify/jwt-model";
import { getRequiredEnv } from "@/lib/aws/env";
import { hasPermission, parseRole, type Permission, type Role } from "@/lib/auth/rbac";

export type SessionContext = {
  userId: string;
  tenantId: string;
  role: Role;
  email?: string;
};

type QanooniJwtPayload = CognitoJwtPayload & {
  "custom:tenant_id"?: string;
  "custom:role"?: string;
  email?: string;
};

function getBearerToken(headers: Headers) {
  const authorization = headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length);
}

export async function requireSession(headers: Headers): Promise<SessionContext> {
  const token = getBearerToken(headers);

  if (!token) {
    throw new Error("Unauthorized: missing bearer token");
  }

  const verifier = CognitoJwtVerifier.create({
    userPoolId: getRequiredEnv("COGNITO_USER_POOL_ID"),
    tokenUse: "access",
    clientId: getRequiredEnv("COGNITO_CLIENT_ID")
  });

  const payload = (await verifier.verify(token)) as QanooniJwtPayload;
  const tenantId = payload["custom:tenant_id"];

  if (!tenantId) {
    throw new Error("Unauthorized: missing tenant claim");
  }

  return {
    userId: payload.sub,
    tenantId,
    role: parseRole(payload["custom:role"]),
    email: payload.email
  };
}

export function requirePermission(session: SessionContext, permission: Permission) {
  if (!hasPermission(session.role, permission)) {
    throw new Error(`Forbidden: missing permission ${permission}`);
  }
}
