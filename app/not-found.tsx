import Link from 'next/link';
import { Ghost } from "@phosphor-icons/react/dist/ssr";

/**
 * Custom 404 Not Found page.
 * Keeps the application's aesthetic while handling missing routes.
 */
export default function NotFound() {
    return (
        <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center p-8 text-white">
            <div className="z-10 flex flex-col items-center gap-8 max-w-2xl text-center">
                <Ghost size={120} weight="thin" className="text-white/20 animate-pulse" />

                <div className="space-y-4">
                    <h1 className="text-7xl md:text-9xl font-bold font-[family-name:var(--font-instrument-serif)]">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-light text-white/80 italic">
                        This image or page does not exist.
                    </h2>
                </div>

                <p className="text-white/60 text-lg max-w-md mx-auto">
                    The link you followed might be broken, or the image has been removed from our edge servers.
                </p>

                <Link
                    href="/"
                    className="mt-8 px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white font-medium transition-all duration-200 hover:scale-105"
                >
                    Return Home
                </Link>
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        </div>
    );
}
