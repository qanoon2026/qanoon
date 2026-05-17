import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireSession } from "@/lib/auth/cognito";
import { tenantQuery } from "@/lib/aws/db";

export const runtime = "nodejs";

type CaseRow = {
  id: string;
  title: string;
  client_name: string;
  court: string;
  status: string;
  priority: string;
  assigned_lawyer_name: string;
  progress: number;
  next_session_at: string | null;
};

export async function GET(request: NextRequest) {
  try {
    const session = await requireSession(request.headers);
    requirePermission(session, "cases:read");

    const cases = await tenantQuery<CaseRow>(
      session.tenantId,
      `
        select
          c.id,
          c.title,
          c.client_name,
          c.court,
          c.status,
          c.priority,
          c.assigned_lawyer_name,
          c.progress,
          c.next_session_at,
          (
            select json_agg(row_to_json(cf)) from (
              select id, file_name, file_type, file_size, s3_key, uploaded_at
              from case_files where tenant_id = $1 and case_id = c.id order by uploaded_at desc
            ) cf
          ) as files
        from legal_cases c
        where c.tenant_id = $1
        order by c.updated_at desc
        limit 100
      `
    );

    return NextResponse.json({ cases });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 401 }
    );
  }
}
