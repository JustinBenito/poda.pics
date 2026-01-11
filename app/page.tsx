"use client";

import Dither from "@/components/Dither";
import { validateImageFile } from "@/lib/utils";
import { Check, Copy, Image, Star } from "@phosphor-icons/react";
import { CheckIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
	const [dragActive, setDragActive] = useState(false);
	const [starCount, setStarCount] = useState<number | null>(null);
	const [uploading, setUploading] = useState(false);
	const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		fetch("https://api.github.com/repos/FOSSUChennai/podu.pics")
			.then((res) => res.json())
			.then((data) => setStarCount(data.stargazers_count))
			.catch((err) => console.error("Failed to fetch star count:", err));
	}, []);

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const uploadFile = async (file: File) => {
		setUploading(true);
		setUploadedUrl(null);

		try {
			const imageValidatedResponse = validateImageFile(file);

			if (!imageValidatedResponse.valid) {
				throw new Error(imageValidatedResponse.error || "Error Uploading the file, Please try again");
			}

			const formData = new FormData();
			formData.append("image", file);

			const metadataResponse = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const metadata = await metadataResponse.json();

			if (!metadataResponse.ok) {
				throw new Error(metadata.error || "Failed to get upload URL");
			}

			const uploadResponse = await fetch(metadata.uploadUrl, {
				method: "PUT",
				body: file,
			});

			if (!uploadResponse.ok) {
				throw new Error("Upload failed");
			}

			setUploadedUrl(metadata.url);
		} catch (err) {
			toast.error(
				err instanceof Error ? err.message : "Upload failed. Please try again.",
			);
		} finally {
			setUploading(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files?.[0]) {
			uploadFile(e.dataTransfer.files[0]);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files?.[0]) {
			uploadFile(e.target.files[0]);
		}
	};

	const copyToClipboard = async () => {
		if (uploadedUrl) {
			await navigator.clipboard.writeText(uploadedUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	const resetUpload = () => {
		setUploadedUrl(null);
		setCopied(false);
	};

	return (
		<div className="relative w-full h-screen bg-black">
			<Script
				defer
				src="https://cloud.umami.is/script.js"
				data-website-id="58061e7d-18c6-42e2-9d46-f1698657b7a9"
			/>
			<Dither
				waveColor={[0.59, 0.83, 0.37]}
				disableAnimation={false}
				enableMouseInteraction
				mouseRadius={0.8}
				colorNum={4}
				pixelSize={2}
				waveAmplitude={0.3}
				waveFrequency={3}
				waveSpeed={0.05}
			/>

			{/* Contribute Button */}
			<a
				href="https://github.com/FOSSUChennai/podu.pics"
				target="_blank"
				rel="noopener noreferrer"
				className="absolute top-6 right-6 z-10 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-white font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
			>
				<Star size={20} weight="fill" />
				Contribute
				{starCount !== null && (
					<span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-sm">
						{starCount}
					</span>
				)}
			</a>

			<div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-8 pointer-events-none">
				<h1 className="font-(family-name:--font-instrument-serif) text-8xl md:text-[256px] text-white">
					Podu.pics
				</h1>

				<div className="w-[90%] max-w-2xl bg-white/10 backdrop-blur-xl rounded-[32px] shadow-2xl p-4 border border-white/20 pointer-events-auto">
					{uploadedUrl ? (
						<div className="flex flex-col items-center gap-6 min-h-[200px] md:min-h-[300px] justify-center ">
							<div className="flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full">
								<Check size={32} weight="bold" className="text-green-400" />
							</div>

							<div className="text-center">
								<h2 className="text-2xl font-bold text-white mb-2">
									Upload Successful!
								</h2>
								<p className="text-white/70 text-sm">
									Your image is ready to share
								</p>
							</div>

							<div className="w-full max-w-md bg-black/30 rounded-xl p-2 md:p-4 flex items-center gap-2">
								<input
									type="text"
									value={uploadedUrl}
									readOnly
									className="flex-1 bg-transparent text-white text-sm outline-none truncate"
								/>
								<button
									onClick={copyToClipboard}
									type="button"
									className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 shrink-0"
								>
									{copied ? (
										<>
											<CheckIcon size={20} className="text-green-400" />
											<span className="hidden md:inline text-green-400 text-sm font-medium">
												Copied!
											</span>
										</>
									) : (
										<>
											<Copy size={20} className="text-white" />
											<span className="hidden md:inline text-white text-sm font-medium">
												Copy
											</span>
										</>
									)}
								</button>
								<a
									href={uploadedUrl}
									className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 shrink-0"
									target="_blank"
								>
									<ExternalLink size={20} className="text-white" />
								</a>
							</div>

							<button
								onClick={resetUpload}
								type="button"
								className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-all duration-200"
							>
								Upload Another
							</button>
						</div>
					) : (
						<form
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
							className="relative"
						>
							<input
								type="file"
								id="file-upload"
								className="hidden"
								onChange={handleChange}
								accept="image/*"
								disabled={uploading}
							/>

							<label
								htmlFor="file-upload"
								className={`
                  flex flex-col items-center justify-center
                  min-h-[200px] md:min-h-[300px] md:p-12
                  border-4 border-dashed rounded-2xl
                  transition-all duration-200
                  ${uploading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                  ${
										dragActive
											? "border-green-400 bg-green-500/10"
											: "border-white/30 hover:border-white/50 hover:bg-white/5"
									}
                `}
							>
								<div className="flex flex-col items-center gap-4">
									{uploading ? (
										<>
											<div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white"></div>
											<p className="text-xl font-medium text-white">
												Uploading...
											</p>
										</>
									) : (
										<>
											<Image
												size={48}
												weight="light"
												className={
													dragActive ? "text-green-400" : "text-white/60"
												}
											/>
											<div className="text-center">
												<p className="text-xl font-medium text-white mb-2">
													{dragActive
														? "Drop your image here"
														: "turn your imgs into links"}
												</p>
												<p className="text-sm text-white/70">
													PNG, JPG, GIF up to 10MB
												</p>
											</div>
										</>
									)}
								</div>
							</label>
						</form>
					)}
				</div>
			</div>

			{/* Footer */}
			<footer className="absolute gap-0 bottom-6 left-0 right-0 text-center">
				<p className="text-white/60 font-bold text-md">
					Developed with love by Justin and Hari
					<br />
					<Link
						href="/foss"
						className="text-white/60 underline font-light italic text-md hover:text-white/80 transition-colors"
					>
						Using awesome <span className="font-bold">FOSS</span> tools
					</Link>
				</p>
			</footer>

			{/* Toast Notifications with Frosted Glass Styling */}
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 4000,
					style: {
						background: "rgba(255, 255, 255, 0.1)",
						backdropFilter: "blur(20px)",
						WebkitBackdropFilter: "blur(20px)",
						border: "1px solid rgba(255, 255, 255, 0.2)",
						borderRadius: "16px",
						color: "#ffffff",
						padding: "16px",
						boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
					},
					error: {
						style: {
							background: "rgba(239, 68, 68, 0.1)",
							backdropFilter: "blur(20px)",
							WebkitBackdropFilter: "blur(20px)",
							border: "1px solid rgba(239, 68, 68, 0.3)",
							color: "#fca5a5",
						},
						iconTheme: {
							primary: "#ef4444",
							secondary: "#ffffff",
						},
					},
					success: {
						style: {
							background: "rgba(34, 197, 94, 0.1)",
							backdropFilter: "blur(20px)",
							WebkitBackdropFilter: "blur(20px)",
							border: "1px solid rgba(34, 197, 94, 0.3)",
							color: "#86efac",
						},
						iconTheme: {
							primary: "#22c55e",
							secondary: "#ffffff",
						},
					},
				}}
			/>
		</div>
	);
}
