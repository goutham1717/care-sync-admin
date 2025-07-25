/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_S3_BUCKET_NAME: string
  readonly VITE_S3_REGION: string
  readonly VITE_AWS_ACCESS_KEY_ID: string
  readonly VITE_AWS_SECRET_ACCESS_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 