/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CARE_SYNC_STAGING_REGION: process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_REGION,
    NEXT_PUBLIC_CARE_SYNC_STAGING_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_ACCESS_KEY_ID,
    NEXT_PUBLIC_CARE_SYNC_STAGING_SECRET_KEY_ID: process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_SECRET_KEY_ID,
    NEXT_PUBLIC_CARE_SYNC_STAGING_BUCKET: process.env.NEXT_PUBLIC_CARE_SYNC_STAGING_BUCKET,
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
