# Qanooni

واجهة Next.js عربية RTL لنظام إدارة قانوني تجريبي، مبنية باستخدام TypeScript وTailwindCSS وApp Router.

## التشغيل

```bash
npm install
npm run dev
```

بعد التشغيل افتح:

```bash
http://localhost:3000/dashboard
```

## الصفحات

- `/dashboard`
- `/cases`
- `/clients`
- `/calendar`
- `/tasks`
- `/files`
- `/settings`

## AWS Deployment Plan

The project is prepared for AWS-first deployment:

- Frontend Hosting: AWS Amplify
- Database: Amazon RDS PostgreSQL
- File Storage: Amazon S3 with presigned upload URLs
- Authentication: Amazon Cognito JWT
- Encryption: AWS KMS for S3 objects
- Authorization: Role Based Access Control
- Tenancy: every server query is scoped by `tenant_id`

Required environment variables in AWS Amplify:

```bash
AWS_REGION=me-south-1
S3_BUCKET_NAME=qanooni-case-files
KMS_KEY_ID=arn:aws:kms:...
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/qanooni
COGNITO_USER_POOL_ID=me-south-1_xxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
```

Runtime storage rule:

- Do not store uploaded files on the app server or inside the project.
- Uploads must request `POST /api/files/presign`.
- The browser uploads directly to S3 using the returned presigned URL.
- Store the returned S3 object key in PostgreSQL.

Core PostgreSQL schema:

```sql
create table tenants (
  id uuid primary key,
  name text not null,
  created_at timestamptz not null default now()
);

create table legal_cases (
  id uuid primary key,
  tenant_id uuid not null references tenants(id),
  title text not null,
  client_name text not null,
  court text not null,
  status text not null,
  priority text not null,
  assigned_lawyer_name text not null,
  progress integer not null default 0,
  next_session_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table case_files (
  id uuid primary key,
  tenant_id uuid not null references tenants(id),
  case_id uuid not null references legal_cases(id),
  s3_key text not null,
  file_name text not null,
  content_type text not null,
  uploaded_by text not null,
  created_at timestamptz not null default now()
);

create index legal_cases_tenant_idx on legal_cases(tenant_id);
create index case_files_tenant_case_idx on case_files(tenant_id, case_id);
```

Cognito custom claims expected by API routes:

```text
custom:tenant_id
custom:role
```

Supported roles:

```text
OWNER, ADMIN, LAWYER, PARALEGAL, CLIENT
```
