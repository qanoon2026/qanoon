import { Pool } from "pg";
import { getRequiredEnv } from "@/lib/aws/env";

let pool: Pool | undefined;

export function getDatabasePool() {
  if (!pool) {
    pool = new Pool({
      connectionString: getRequiredEnv("DATABASE_URL"),
      ssl: { rejectUnauthorized: true },
      max: 10
    });
  }

  return pool;
}

export async function tenantQuery<T extends Record<string, unknown>>(
  tenantId: string,
  text: string,
  params: unknown[] = []
) {
  const database = getDatabasePool();
  const result = await database.query<T>(text, [tenantId, ...params]);
  return result.rows;
}
