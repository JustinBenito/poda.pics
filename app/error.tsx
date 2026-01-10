'use client';

import { useEffect } from 'react';
import { Warning } from "@phosphor-icons/react";

/**
 * Global error boundary for the application.
 * This component catches runtime errors in the component tree
 * and provides a fallback UI to the user.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center p-8">
            <div className="z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-12 max-w-xl w-full text-center flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Warning size={40} weight="bold" className="text-red-400" />
                </div>

                <h1 className="text-4xl font-bold text-white font-[family-name:var(--font-instrument-serif)]">
                    Application Error
                </h1>

                <p className="text-white/70 text-lg leading-relaxed">
                    The application encountered an unexpected issue. This might be due to a temporary problem with the background visuals or a network error.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
                    <button
                        onClick={() => reset()}
                        className="flex-1 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all duration-200"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="flex-1 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 border border-white/10 transition-all duration-200"
                    >
                        Back Home
                    </button>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-black/40 rounded-xl w-full text-left overflow-auto max-h-40">
                        <p className="text-red-400 text-xs font-mono break-all font-bold mb-2">Error Log:</p>
                        <p className="text-white/50 text-xs font-mono break-all">{error.message}</p>
                    </div>
                )}
            </div>

            {/* Background Decorative Element */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none" />
        </div>
    );
}
