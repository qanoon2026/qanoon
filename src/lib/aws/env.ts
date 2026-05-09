const requiredKeys = [
  "AWS_REGION",
  "S3_BUCKET_NAME",
  "KMS_KEY_ID",
  "DATABASE_URL",
  "COGNITO_USER_POOL_ID",
  "COGNITO_CLIENT_ID"
] as const;

export type AwsEnvKey = (typeof requiredKeys)[number];

export function getEnv(key: AwsEnvKey) {
  return process.env[key];
}

export function getRequiredEnv(key: AwsEnvKey) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function getAwsEnvironmentStatus() {
  return requiredKeys.map((key) => ({
    key,
    configured: Boolean(process.env[key])
  }));
}
