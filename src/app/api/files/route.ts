import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireSession } from "@/lib/auth/cognito";
import { getDatabasePool } from "@/lib/aws/db";
import { createPresignedGetUrl } from "@/lib/aws/s3";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // allow unauthenticated uploads temporarily
    let session = null;
    try {
      session = await requireSession(request.headers);
      requirePermission(session, "files:write");
    } catch (e) {
      session = null;
    }

    const body = await request.json();

    const { caseId, fileName, fileType, fileSize, s3Key, tenantId: bodyTenant } = body;

    if (!caseId || !fileName || !fileType || !fileSize || !s3Key) {
      return NextResponse.json({ error: "مطلوب: caseId, fileName, fileType, fileSize, s3Key" }, { status: 400 });
    }

    const tenantId = session?.tenantId || bodyTenant || "public";

    const pool = getDatabasePool();

    try {
      const result = await pool.query(
        `insert into case_files (tenant_id, case_id, file_name, file_type, file_size, s3_key, uploaded_at)
         values ($1,$2,$3,$4,$5,$6, now()) returning id, case_id, file_name, file_type, file_size, s3_key, uploaded_at`,
        [tenantId, caseId, fileName, fileType, fileSize, s3Key]
      );

      const file = result.rows[0];
      file.downloadUrl = await createPresignedGetUrl(file.s3_key, 60 * 60);

      return NextResponse.json({ file });
    } catch (dbErr) {
      return NextResponse.json({ error: "فشل حفظ بيانات الملف في قاعدة البيانات" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "خطأ غير متوقع" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // allow unauthenticated reads temporarily
    let session = null;
    try {
      session = await requireSession(request.headers);
      requirePermission(session, "files:read");
    } catch (e) {
      session = null;
    }

    const url = new URL(request.url);
    const caseId = url.searchParams.get("caseId");
    const bodyTenant = url.searchParams.get("tenantId");

    if (!caseId) {
      return NextResponse.json({ error: "مطلوب: caseId" }, { status: 400 });
    }

    const tenantId = session?.tenantId || bodyTenant || "public";

    const pool = getDatabasePool();
    const result = await pool.query(
      `select id, case_id, file_name, file_type, file_size, s3_key, uploaded_at from case_files where tenant_id = $1 and case_id = $2 order by uploaded_at desc`,
      [tenantId, caseId]
    );

    const files = await Promise.all(
      result.rows.map(async (r: any) => {
        try {
          const downloadUrl = await createPresignedGetUrl(r.s3_key, 60 * 60);
          return { ...r, downloadUrl };
        } catch (e) {
          return r;
        }
      })
    );

    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "خطأ غير متوقع" }, { status: 500 });
  }
}
