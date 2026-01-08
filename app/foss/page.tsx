'use client';

import { Star, ArrowLeft, GithubLogo } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface FossTool {
  name: string;
  description: string;
  githubUrl: string;
}

interface FossData {
  tools: FossTool[];
}

export default function FossPage() {
  const [starCount, setStarCount] = useState<number | null>(null);
  const [fossTools, setFossTools] = useState<FossTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch star count
    fetch('https://api.github.com/repos/FOSSUChennai/podu.pics')
      .then(res => res.json())
      .then(data => setStarCount(data.stargazers_count))
      .catch(err => console.error('Failed to fetch star count:', err));

    // Fetch FOSS tools from JSON file via API
    fetch('/api/foss-tools')
      .then(res => res.json())
      .then((data: FossData) => {
        setFossTools(data.tools);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch FOSS tools:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Header with Back and Contribute buttons */}
      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-center">
        <Link
          href="/"
          className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border-[1px] border-white/30 rounded-full text-white font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          <ArrowLeft size={20} weight="bold" />
          Back
        </Link>

        <a
          href="https://github.com/FOSSUChennai/podu.pics"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border-[1px] border-white/30 rounded-full text-white font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          <Star size={20} weight="fill" />
          Contribute
          {starCount !== null && (
            <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-sm">
              {starCount}
            </span>
          )}
        </a>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-6xl md:text-8xl text-white mb-4">
            FOSS Tools
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Podu.pics is built with amazing open-source tools. Here are the technologies that power this project.
          </p>
          <br />
          <Link
            href="https://fossunited.org/c/chennai"
            className="text-white/60 underline font-light italic text-md hover:text-white/80 transition-colors"
          >
            To Know more about FOSS, Join <span className="font-bold">FOSS United!</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            {fossTools.map((tool) => (
              <div
                key={tool.name}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
                  <a
                    href={tool.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                    aria-label={`Visit ${tool.name} on GitHub`}
                  >
                    <GithubLogo size={24} weight="fill" className="text-white/70 hover:text-white" />
                  </a>
                </div>
                <p className="text-white/70 leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 pb-6 text-center">
        <p className="text-white/60 font-bold text-md">
          Developed with love by Justin and Hari
          <br />
          <span className="font-light italic">
            Using awesome <span className="font-bold">FOSS</span> tools
          </span>
        </p>
      </footer>
    </div>
  );
}
