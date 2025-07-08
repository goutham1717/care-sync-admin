import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const getRequiredEnvVar = (name: string): string => {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('S3 client can only be used in browser environment');
  }

  // Debug all environment variables
  console.log('All environment variables:', {
    NEXT_PUBLIC_CARE_SYNC_STAGING_REGION: process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_REGION,
    NEXT_PUBLIC_CARE_SYNC_STAGING_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_ACCESS_KEY_ID ? 'exists' : 'missing',
    NEXT_PUBLIC_CARE_SYNC_STAGING_SECRET_KEY_ID: process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_SECRET_KEY_ID ? 'exists' : 'missing',
    NEXT_PUBLIC_CARE_SYNC_STAGING_BUCKET: process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_BUCKET,
  });

  const value = process.env[name];
  console.log(`Value for ${name}:`, value);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}. Make sure it's properly set in .env.local and the app is running in browser context. Current env: ${JSON.stringify(process.env, null, 2)}`);
  }
  return value;
};

// Initialize S3 client only on the client side
let s3Client: S3Client | null = null;

export const getS3Client = () => {
  if (typeof window === 'undefined') {
    throw new Error('S3 client can only be used in browser environment');
  }

  if (!s3Client) {
    s3Client = new S3Client({
      region: getRequiredEnvVar('NEXT_PUBLIC_CARE_SYNC_STAGING_REGION'),
      credentials: {
        accessKeyId: getRequiredEnvVar('NEXT_PUBLIC_CARE_SYNC_STAGING_ACCESS_KEY_ID'),
        secretAccessKey: getRequiredEnvVar('NEXT_PUBLIC_CARE_SYNC_STAGING_SECRET_KEY_ID'),
      },
      forcePathStyle: true,
    });
  }
  return s3Client;
};

// Helper function for uploading files in browser environment
export const uploadToS3 = async (file: File, key: string) => {
  const client = getS3Client();
  const upload = new Upload({
    client,
    params: {
      Bucket: getRequiredEnvVar('NEXT_PUBLIC_CARE_SYNC_STAGING_BUCKET'),
      Key: key,
      Body: file,
      ContentType: file.type,
    },
  });

  return upload.done();
}; 