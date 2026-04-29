"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function InteractionLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clickPulse, setClickPulse] = useState<{ x: number; y: number; id: number } | null>(null);

  // Global mouse coordinates for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleGlobalClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setClickPulse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    });
    
    // Clear pulse after animation
    setTimeout(() => setClickPulse(null), 800);
  };

  // Card 1: Surfaces React (Flip)
  const [isFlipped, setIsFlipped] = useState(false);

  // Magnetic Pull Calculation (Generic)
  const useMagnetic = (elementX: number, elementY: number, pullStrength: number = 0.05) => {
    const distanceX = useTransform(mouseX, (mX) => (mX - elementX) * pullStrength);
    const distanceY = useTransform(mouseY, (mY) => (mY - elementY) * pullStrength);
    const springX = useSpring(distanceX, { damping: 20, stiffness: 150 });
    const springY = useSpring(distanceY, { damping: 20, stiffness: 150 });
    return { x: springX, y: springY };
  };

  // Approximate centers for desktop positioning
  const mag1 = useMagnetic(300, 200, 0.04);
  const mag2 = useMagnetic(800, 400, 0.06);
  const mag3 = useMagnetic(400, 600, 0.08);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleGlobalClick}
      className="py-16 px-6 md:px-12 bg-[#050505] text-white border-b-4 border-black relative overflow-hidden cursor-crosshair"
    >
      {/* Background Noise & Gradient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-red-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>

      {/* Huge Background Parallax Text */}
      <motion.div
        style={{
          x: useTransform(mouseX, [0, 2000], [-40, 40]),
          y: useTransform(mouseY, [0, 1000], [-40, 40])
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.04]"
      >
        <h1 className="text-[10vw] md:text-[12vw] leading-[0.8] font-black text-center uppercase tracking-tighter whitespace-nowrap">
          Stuff I Create<br />When I'm Bored
        </h1>
      </motion.div>

      {/* Ripple Effect */}
      {clickPulse && (
        <motion.div
          key={clickPulse.id}
          initial={{ scale: 0, opacity: 0.8, borderWidth: "10px" }}
          animate={{ scale: 4, opacity: 0, borderWidth: "0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute rounded-full border-white z-0 pointer-events-none mix-blend-difference"
          style={{
            left: clickPulse.x - 50,
            top: clickPulse.y - 50,
            width: 100,
            height: 100,
          }}
        />
      )}

      <div className="max-w-7xl mx-auto relative z-10 w-full h-full flex flex-col">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black uppercase mb-8 text-white stroke-text tracking-tighter mix-blend-difference relative z-50 pointer-events-none"
        >
          Interaction Lab
        </motion.h2>
        
        {/* Desktop Asymmetrical Layout / Mobile Stack */}
        <div className="relative w-full md:h-[400px] flex flex-col md:block gap-8 mt-8 perspective-[1200px]">
          
          {/* Card 1: Surfaces React */}
          <motion.div
            style={{ x: mag1.x, y: mag1.y }}
            className="md:absolute md:top-0 md:left-4 z-20 group"
          >
            <motion.div
              onHoverStart={() => setIsFlipped(true)}
              onHoverEnd={() => setIsFlipped(false)}
              animate={{ rotateY: isFlipped ? 180 : 0, rotateZ: isFlipped ? 0 : -4 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="w-full md:w-64 h-48 border-4 border-white/80 flex items-center justify-center bg-[#1a1a1a] shadow-[12px_12px_0_0_rgba(255,255,255,0.1)] relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-red-600 backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="font-black uppercase text-3xl text-center leading-tight">Surfaces<br/>React</span>
                <span className="mt-4 text-xs font-bold tracking-widest opacity-70">(Hover Me)</span>
              </div>
              
              {/* Back */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white text-black backface-hidden"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="w-full h-full border-2 border-dashed border-black/20 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                    whileTap={{ scale: 0.9 }}
                    className="px-6 py-3 border-2 border-black font-bold uppercase transition-colors"
                  >
                    Action
                  </motion.button>
                  <motion.div 
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-1 bg-red-500 absolute bottom-4"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2: Objects Resist */}
          <motion.div
            style={{ x: mag2.x, y: mag2.y }}
            className="md:absolute md:top-12 md:right-4 z-30"
          >
            <motion.div
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              whileDrag={{ scale: 1.05, rotateZ: 5, boxShadow: "20px 20px 0px 0px rgba(255,255,255,0.2)", cursor: "grabbing" }}
              whileHover={{ scale: 1.02 }}
              animate={{ rotateZ: 3 }}
              className="w-full md:w-80 h-56 border-4 border-white flex flex-col items-center justify-center bg-blue-600 shadow-[8px_8px_0_0_#fff] cursor-grab"
            >
              <div className="flex-1 flex items-center justify-center text-center p-8 pointer-events-none mix-blend-overlay">
                <span className="font-black uppercase text-4xl leading-none">Objects<br/>Resist</span>
              </div>
              <div className="h-12 w-full border-t-4 border-white/30 flex items-center justify-between px-4 bg-black/20 pointer-events-none">
                <span className="text-xs font-bold uppercase tracking-widest">Weight: Heavy</span>
                <span className="text-xs font-bold uppercase tracking-widest">(Drag Me)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 3: Nothing Stays Static */}
          <motion.div
            style={{ x: mag3.x, y: mag3.y }}
            className="md:absolute md:bottom-[-20px] md:left-[40%] z-10"
          >
            <motion.div
              whileHover={{ 
                borderRadius: ["0%", "50%", "30% 70% 70% 30% / 30% 30% 70% 70%", "0%"],
                rotateZ: [0, 45, 90, 0],
                backgroundColor: ["#eab308", "#a855f7", "#ec4899", "#eab308"]
              }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              animate={{ rotateZ: -6 }}
              className="w-full md:w-48 h-48 border-4 border-white flex items-center justify-center bg-yellow-500 shadow-[10px_10px_0_0_rgba(255,255,255,0.15)] relative overflow-hidden group"
            >
              <span className="font-black uppercase text-2xl text-center leading-tight mix-blend-difference text-white z-10 pointer-events-none">
                Nothing<br/>Stays<br/>Static
              </span>
              
              {/* Inner floating particles */}
              <motion.div 
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }} 
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <motion.div 
                animate={{ y: [0, 30, 0], x: [0, -20, 0] }} 
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-6 right-8 w-6 h-6 bg-white mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity rotate-45"
              />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
