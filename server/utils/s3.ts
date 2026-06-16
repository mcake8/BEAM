import { Buffer } from 'node:buffer'
import { randomUUID } from 'node:crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// AWS SDK requires a region value for SigV4 request signing. MinIO ignores it —
// this is NOT a geographic setting, so it stays a constant rather than an env var.
const REGION = 'us-east-1'

let _client: S3Client | null = null

function client(): S3Client {
  if (!_client) {
    _client = new S3Client({
      region: REGION,
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: true, // required for MinIO / path-style buckets
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
      },
    })
  }
  return _client
}

function sanitize(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

/** Uploads a file to the public bucket and returns its permanent public URL. */
export async function uploadFile(
  buffer: Buffer,
  contentType: string,
  originalName: string,
): Promise<string> {
  const bucket = process.env.S3_BUCKET || ''
  const key = `${randomUUID()}/${sanitize(originalName)}`

  await client().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  )

  const base = (process.env.S3_PUBLIC_URL || '').replace(/\/$/, '')
  return `${base}/${bucket}/${key}`
}
