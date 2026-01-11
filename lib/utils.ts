import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "./constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface ImageValidationResult {
	valid: boolean;
	error?: string;
}

/**
 * Validates an image file to ensure it's a JPG, PNG, or GIF and is 10MB or less.
 * @param file - The file to validate
 * @returns An object with validation result and optional error message
 */
export function validateImageFile(file: File): ImageValidationResult {
	// Check file type
	if (!ALLOWED_TYPES.includes(file.type)) {
		return {
			valid: false,
			error: "Invalid file type. Only JPG, PNG, and GIF are allowed.",
		};
	}

	// Check file size
	if (file.size > MAX_FILE_SIZE) {
		return {
			valid: false,
			error: "File too large. Maximum size is 10MB.",
		};
	}

	return { valid: true };
}
