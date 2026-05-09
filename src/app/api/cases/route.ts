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
          id,
          title,
          client_name,
          court,
          status,
          priority,
          assigned_lawyer_name,
          progress,
          next_session_at
        from legal_cases
        where tenant_id = $1
        order by updated_at desc
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
