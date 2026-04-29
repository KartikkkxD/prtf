import Hero from "@/components/Hero";
import GlassPanel from "@/components/GlassPanel";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center overflow-hidden">
      <Hero />
      <GlassPanel />
    </main>
  );
}
