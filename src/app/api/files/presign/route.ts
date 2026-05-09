import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireSession } from "@/lib/auth/cognito";
import { createCaseFileUploadUrl } from "@/lib/aws/s3";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const session = await requireSession(request.headers);
    requirePermission(session, "files:write");

    const body = (await request.json()) as {
      caseId?: string;
      fileName?: string;
      contentType?: string;
    };

    if (!body.caseId || !body.fileName || !body.contentType) {
      return NextResponse.json(
        { error: "caseId, fileName and contentType are required" },
        { status: 400 }
      );
    }

    const upload = await createCaseFileUploadUrl({
      tenantId: session.tenantId,
      caseId: body.caseId,
      fileName: body.fileName,
      contentType: body.contentType
    });

    return NextResponse.json(upload);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 401 }
    );
  }
}
