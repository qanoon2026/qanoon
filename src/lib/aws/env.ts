export const bucketName = process.env.S3_BUCKET_NAME || "qanoon-case-files";

export function getEnv(key: string) {
  return process.env[key];
}

export function getAwsEnv(key: string) {
  const names = alt(key);
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  return undefined;
}

export function getRequiredAwsEnv(key: string) {
  const value = getAwsEnv(key);
  if (!value) {
    const names = alt(key);
    throw new Error(`خطأ: المتغير البيئي المفقود: ${names.join(" / ")}`);
  }
  return value;
}

function alt(key: string) {
  // Map to APP_* names only for Amplify runtime compatibility
  const map: Record<string, string[]> = {
    AWS_REGION: ["APP_AWS_REGION"],
    AWS_ACCESS_KEY_ID: ["APP_AWS_ACCESS_KEY_ID"],
    AWS_SECRET_ACCESS_KEY: ["APP_AWS_SECRET_ACCESS_KEY"],
    S3_BUCKET_NAME: ["S3_BUCKET_NAME"],
    KMS_KEY_ID: ["KMS_KEY_ID"],
    DATABASE_URL: ["DATABASE_URL"],
    COGNITO_USER_POOL_ID: ["COGNITO_USER_POOL_ID"],
    COGNITO_CLIENT_ID: ["COGNITO_CLIENT_ID"]
  };

  return map[key] ?? [key];
}

export function getRequiredEnv(key: string) {
  if (key === "S3_BUCKET_NAME") {
    return bucketName;
  }

  const names = alt(key);
  for (const name of names) {
    const v = process.env[name];
    if (v) return v;
  }

  // Arabic message for missing env variable
  throw new Error(`خطأ: المتغير البيئي المفقود: ${names.join(" / ")}`);
}

export function getAwsEnvironmentStatus() {
  const keys = ["APP_AWS_REGION", "S3_BUCKET_NAME", "DATABASE_URL", "COGNITO_USER_POOL_ID", "COGNITO_CLIENT_ID"];
  return keys.map((key) => ({
    key,
    configured: Boolean(process.env[key])
  }));
}
