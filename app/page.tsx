import Dither from "@/components/Dither";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-black">
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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-9xl text-white">
          Podu.pics
        </h1>
      </div>
    </div>
  );
}
