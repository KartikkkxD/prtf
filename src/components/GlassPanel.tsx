"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ModeSelection from "./ModeSelection";

export default function GlassPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <section 
      id="modes" 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-20 z-20"
    >
      <motion.div 
        style={{ opacity, y, scale }}
        className="w-full max-w-6xl mx-auto rounded-[2rem] p-8 md:p-12 backdrop-blur-xl bg-white/30 border border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.1)] relative overflow-hidden"
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-[2rem]" />
        
        <div className="relative z-10">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-4">Choose Your Experience</h2>
            <p className="text-black/70 font-medium">Select a mode below to view my work tailored to your needs.</p>
          </div>
          
          <ModeSelection />
        </div>
      </motion.div>
    </section>
  );
}
