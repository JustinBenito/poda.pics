import { nanoid } from "nanoid";
import { type NextRequest, NextResponse } from "next/server";
import { generatePresignedUpload } from "@/lib/r2-client";
import { validateImageFile } from "@/lib/utils";

export async function POST(request: NextRequest) {
	try {
		const imageFile = (await request.formData()).get("image") as File;

		const { valid, error } = validateImageFile(imageFile);

		if (!valid) {
			throw new Error(error || "Error Uploading the file, Please try again");
		}

		const key = nanoid(10);
		const presigned = await generatePresignedUpload(key, imageFile.type);

		return NextResponse.json({
			success: true,
			uploadUrl: presigned.uploadUrl,
			key: presigned.key,
			url: presigned.publicUrl,
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json(
			{ error: "Failed to generate upload URL. Please try again." },
			{ status: 500 },
		);
	}
}
