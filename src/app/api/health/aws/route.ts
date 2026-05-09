import { NextResponse } from "next/server";
import { getAwsEnvironmentStatus } from "@/lib/aws/env";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    service: "qanooni",
    target: "aws",
    environment: getAwsEnvironmentStatus()
  });
}
