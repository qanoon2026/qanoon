import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getRequiredEnv } from "@/lib/aws/env";

let s3Client: S3Client | undefined;

export function getS3Client() {
  if (!s3Client) {
    s3Client = new S3Client({
      region: getRequiredEnv("AWS_REGION")
    });
  }

  return s3Client;
}

export async function createCaseFileUploadUrl({
  tenantId,
  caseId,
  fileName,
  contentType
}: {
  tenantId: string;
  caseId: string;
  fileName: string;
  contentType: string;
}) {
  const safeFileName = fileName.replace(/[^\w.\-ء-ي ]/g, "_");
  const key = `tenants/${tenantId}/cases/${caseId}/${randomUUID()}-${safeFileName}`;

  const command = new PutObjectCommand({
    Bucket: getRequiredEnv("S3_BUCKET_NAME"),
    Key: key,
    ContentType: contentType,
    ServerSideEncryption: "aws:kms",
    SSEKMSKeyId: getRequiredEnv("KMS_KEY_ID"),
    Metadata: {
      tenantId,
      caseId
    }
  });

  const uploadUrl = await getSignedUrl(getS3Client(), command, {
    expiresIn: 60 * 10
  });

  return {
    key,
    uploadUrl,
    expiresInSeconds: 600
  };
}
