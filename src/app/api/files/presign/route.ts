import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireSession } from "@/lib/auth/cognito";
import { createCaseFileUploadUrl } from "@/lib/aws/s3";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Try to authenticate; if no token present, allow unauthenticated upload with a fallback tenantId.
    let session = null;
    try {
      session = await requireSession(request.headers);
      requirePermission(session, "files:write");
    } catch (e) {
      // authentication not present or failed — fall back to anonymous flow
      session = null;
    }

    const body = await request.json();
    const { caseId, fileName, contentType, tenantId: bodyTenant } = body;

    if (!caseId || !fileName || !contentType) {
      return NextResponse.json({ error: "مطلوب: caseId, fileName, contentType" }, { status: 400 });
    }

    const tenantId = session?.tenantId || bodyTenant || "public";

    const upload = await createCaseFileUploadUrl({
      tenantId,
      caseId,
      fileName,
      contentType
    });

    return NextResponse.json(upload);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "خطأ غير متوقع" }, { status: 500 });
  }
}
