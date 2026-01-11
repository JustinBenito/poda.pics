import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2Client = new S3Client({
	region: "auto",
	endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
	},
});

export interface PresignedUpload {
	uploadUrl: string;
	key: string;
	publicUrl: string;
}

export async function generatePresignedUpload(
	key: string,
	contentType: string,
): Promise<PresignedUpload> {
	const command = new PutObjectCommand({
		Bucket: process.env.R2_BUCKET_NAME!,
		Key: key,
		ContentType: contentType,
		CacheControl: "public, max-age=31536000, immutable",
	});

	const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 60 });
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

	return {
		uploadUrl,
		key,
		publicUrl: `${baseUrl}/${key}`,
	};
}

export async function getFromR2(key: string) {
	const response = await r2Client.send(
		new GetObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME!,
			Key: key,
		}),
	);

	if (!response.Body) {
		throw new Error("Image not found");
	}

	const buffer = Buffer.from(await response.Body.transformToByteArray());
	const contentType = response.ContentType || "image/jpeg";

	return { buffer, contentType };
}

export default r2Client;
