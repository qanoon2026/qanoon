import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getAwsEnv, getRequiredAwsEnv, bucketName as defaultS3BucketName } from "@/lib/aws/env";

let s3Client: S3Client | undefined;

export function getS3Client() {
  if (!s3Client) {
    let region: string;
    try {
      region = getRequiredAwsEnv("AWS_REGION");
    } catch (err) {
      // Log and rethrow with Arabic message
      // eslint-disable-next-line no-console
      console.error('S3 client init failed: missing APP_AWS_REGION', err);
      throw new Error("خطأ: المتغير البيئي المفقود: APP_AWS_REGION");
    }

    const accessKey = getAwsEnv("AWS_ACCESS_KEY_ID");
    const secretKey = getAwsEnv("AWS_SECRET_ACCESS_KEY");

    // Log region and whether an access key is present.
    // Do not log sensitive secret values.
    // eslint-disable-next-line no-console
    console.log('AWS region loaded');
    if (accessKey) {
      // eslint-disable-next-line no-console
      console.log('AWS access key loaded');
    }

    const config: any = { region };

    if (accessKey && secretKey) {
      config.credentials = { accessKeyId: accessKey, secretAccessKey: secretKey };
    } else {
      // eslint-disable-next-line no-console
      console.warn('S3 client: AWS credentials not fully configured; will rely on default provider chain');
    }

    try {
      s3Client = new S3Client(config);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to create S3Client', err);
      throw new Error('فشل تهيئة عميل S3');
    }
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
    // sanitize filename: keep latin letters, digits, Arabic block, dot, dash and space
    const safeFileName = fileName.replace(/[^0-9A-Za-z\u0600-\u06FF.\- ]/g, "_");
    const key = `tenants/${tenantId}/cases/${caseId}/${randomUUID()}-${safeFileName}`;

    const bucketName = defaultS3BucketName;
    // eslint-disable-next-line no-console
    console.log('S3 bucket loaded:', bucketName);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
      Metadata: {
        tenantId,
        caseId
      }
    });

    try {
      const uploadUrl = await getSignedUrl(getS3Client(), command, {
        expiresIn: 60 * 10
      });

      return {
        key,
        uploadUrl,
        expiresInSeconds: 600
      };
    } catch (err: any) {
      // Inspect common AWS errors
      // eslint-disable-next-line no-console
      console.error('Presign generation error', err);
      if (err?.name === 'CredentialsProviderError' || /credentials/i.test(err?.message)) {
        throw new Error('فشل التحقق من بيانات AWS: تحقق من APP_AWS_ACCESS_KEY_ID و APP_AWS_SECRET_ACCESS_KEY');
      }
      if (err?.Code === 'NoSuchBucket' || /NoSuchBucket/i.test(err?.message)) {
        throw new Error('خطأ: حاوية S3 غير صالحة (S3_BUCKET_NAME غير صحيح)');
      }
      throw new Error('فشل إنشاء رابط التحميل المسبق إلى S3');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('createCaseFileUploadUrl top-level error', err);
    throw err instanceof Error ? err : new Error('فشل إنشاء رابط التحميل المسبق إلى S3');
  }
}

export async function createPresignedGetUrl(key: string, expiresSeconds = 60 * 10) {
  try {
    const bucketName = defaultS3BucketName;
    // eslint-disable-next-line no-console
    console.log('S3 bucket loaded:', bucketName);
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key
    });

    const url = await getSignedUrl(getS3Client(), command, { expiresIn: expiresSeconds });
    return url;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('Presign GET error', err);
    if (err?.message && /المتغير البيئي المفقود/.test(err.message)) {
      throw new Error(err.message);
    }
    throw new Error("فشل إنشاء رابط التنزيل المسبق من S3: presign GET failed");
  }
}
