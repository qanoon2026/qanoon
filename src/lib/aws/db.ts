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

    // Ensure the case_files table exists. Run migration once on pool creation.
    (async () => {
      try {
        await pool!.query(`
          create table if not exists case_files (
            id serial primary key,
            tenant_id text not null,
            case_id text not null,
            file_name text not null,
            file_type text,
            file_size bigint,
            s3_key text not null,
            uploaded_at timestamptz default now()
          );
        `);

        await pool!.query(`create index if not exists idx_case_files_tenant_case on case_files(tenant_id, case_id);`);
      } catch (err) {
        // Log migration error; don't crash the app during build-time.
        // The API endpoints will return DB errors if the DB isn't reachable.
        // Arabic message to help debugging.
        // eslint-disable-next-line no-console
        console.error("فشل تطبيق ترحيل قاعدة البيانات case_files:", err);
      }
    })();
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
