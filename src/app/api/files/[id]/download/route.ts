import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/cognito";
import { getDatabasePool } from "@/lib/aws/db";
import { createPresignedGetUrl } from "@/lib/aws/s3";

export const runtime = "nodejs";

export async function GET(request: NextRequest, context: any) {
  try {
    // allow unauthenticated download temporarily
    let session = null;
    try {
      session = await requireSession(request.headers);
    } catch (e) {
      session = null;
    }

    const id = context?.params?.id;
    const url = new URL(request.url);
    const bodyTenant = url.searchParams.get("tenantId");
    const tenantId = session?.tenantId || bodyTenant || "public";

    const pool = getDatabasePool();
    const result = await pool.query(`select id, s3_key from case_files where id = $1 and tenant_id = $2 limit 1`, [id, tenantId]);
    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: "الملف غير موجود" }, { status: 404 });
    }

    const row = result.rows[0];
    try {
      const url = await createPresignedGetUrl(row.s3_key, 60 * 10);
      // redirect the client to the presigned URL
      return NextResponse.redirect(url);
    } catch (err) {
      return NextResponse.json({ error: "فشل إنشاء رابط التنزيل من S3" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "خطأ غير متوقع" }, { status: 500 });
  }
}
