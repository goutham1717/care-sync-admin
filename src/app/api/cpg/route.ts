import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const Bucket = process.env.CARE_SYNC_STAGING_BUCKET;
const Region = process.env.CARE_SYNC_STAGING_REGION

const s3 = new S3Client({
  region: Region,
  credentials: {
    accessKeyId: process.env.CARE_SYNC_STAGING_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CARE_SYNC_STAGING_SECRET_KEY_ID as string,
  },
});

export async function GET() {
  const response = await s3.send(new ListObjectsCommand({ Bucket }));
  return NextResponse.json(response?.Contents ?? []);
}

export async function POST(request: any, res: any) {
  try {
    const formData = await request.formData();
    const file = formData.getAll("file")[0];
    const Body = await file.arrayBuffer();
    let URL = '';
    const response = await s3.send(new PutObjectCommand({ Bucket, Key: `cpg/${file.name}`, Body }));
    if (response.$metadata.httpStatusCode === 200) {
      URL = `https://${Bucket}.s3.${Region}.amazonaws.com/cpg/${file.name}`
    }
    return NextResponse.json({ URL });
  } catch (e) {

    console.log("EXCEPTION", e);
    return NextResponse.json(e);
  }
}