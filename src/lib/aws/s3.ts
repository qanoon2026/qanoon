import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getRequiredEnv } from "@/lib/aws/env";

let s3Client: S3Client | undefined;

export function getS3Client() {
  if (!s3Client) {
    const region = getRequiredEnv("AWS_REGION");
    const accessKey = process.env.APP_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
    const secretKey = process.env.APP_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

    const config: any = { region };

    if (accessKey && secretKey) {
      config.credentials = { accessKeyId: accessKey, secretAccessKey: secretKey };
    }

    s3Client = new S3Client(config);
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
  try {
    const safeFileName = fileName.replace(/[^\w.\-ء-ي ]/g, "_");
    const key = `tenants/${tenantId}/cases/${caseId}/${randomUUID()}-${safeFileName}`;

    const command = new PutObjectCommand({
      Bucket: getRequiredEnv("S3_BUCKET_NAME"),
      Key: key,
      ContentType: contentType,
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
  } catch (err) {
    throw new Error("فشل إنشاء رابط التحميل المسبق إلى S3: presign failed");
  }
}

export async function createPresignedGetUrl(key: string, expiresSeconds = 60 * 10) {
  try {
    const command = new GetObjectCommand({
      Bucket: getRequiredEnv("S3_BUCKET_NAME"),
      Key: key
    });

    const url = await getSignedUrl(getS3Client(), command, { expiresIn: expiresSeconds });
    return url;
  } catch (err) {
    throw new Error("فشل إنشاء رابط التنزيل المسبق من S3: presign GET failed");
  }
}
