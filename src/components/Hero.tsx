"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text reveal
      gsap.fromTo(
        ".reveal-text",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );
      
      // Floating elements fade
      gsap.fromTo(
        ".fade-in",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden px-6 py-8 md:px-12 md:py-10"
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center items-start">
        
        {/* Background Typography */}
        <h1 
          ref={textRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] md:text-[15vw] font-serif leading-none tracking-tighter opacity-10 whitespace-nowrap select-none pointer-events-none"
        >
          Creative Dev.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          
          {/* Left Text Block */}
          <div className="col-span-1 lg:col-span-5 flex flex-col items-start gap-6 z-20">
            <div className="overflow-hidden">
              <h2 className="font-serif leading-[1.05] tracking-tight flex flex-col">
                <span className="reveal-text block text-6xl md:text-8xl font-bold text-[#2b2b2b]">Kartikay</span>
                <span className="reveal-text block pl-12 md:pl-32 text-4xl md:text-6xl text-[#2b2b2b]/70 italic mt-2">Sharma</span>
              </h2>
            </div>
            
            <div className="overflow-hidden max-w-md">
              <p className="reveal-text text-lg md:text-xl font-medium leading-relaxed text-black/80">
                Bridging the gap between robust engineering and editorial-grade visual aesthetics.
              </p>
            </div>
            
            <div className="fade-in mt-4 flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById("modes")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-[#2b2b2b] text-white rounded-2xl font-semibold hover:bg-black transition-colors shadow-[0_10px_30px_rgba(43,43,43,0.2)]"
              >
                View My Work
              </button>
              <button className="px-8 py-4 bg-transparent border border-black/20 text-[#2b2b2b] rounded-2xl font-semibold hover:bg-black/5 transition-colors">
                Explore More
              </button>
            </div>
          </div>

          {/* Right Floating Profile Card */}
          <div className="col-span-1 lg:col-span-7 flex justify-center lg:justify-end relative z-20 mt-12 lg:mt-0">
            <motion.div
              className="relative w-64 h-80 md:w-80 md:h-96 rounded-3xl shadow-[0_20px_50px_rgba(181,159,140,0.3)] border-[6px] border-[#e2d9ce] rotate-2"
              whileHover={{ scale: 1.05, rotate: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image 
                  src="/avatar.png" 
                  alt="Kartikay Sharma" 
                  fill 
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Speech Bubble */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
                className="absolute -top-6 -right-6 bg-[#e2d9ce] text-[#2b2b2b] px-5 py-2.5 rounded-2xl font-bold border-2 border-white shadow-xl rotate-12 z-10 text-sm"
              >
                hello!
              </motion.div>
            </motion.div>
          </div>
          
        </div>
      </div>

      {/* Bottom Row */}
      <div className="absolute bottom-8 md:bottom-10 left-6 right-6 md:left-12 md:right-12 fade-in flex justify-between items-end z-20">
        <div className="text-sm font-medium text-black/60 max-w-[200px]">
          ✦ Based in Greater Noida <br/> Available for freelance
        </div>
        
        <button 
          onClick={() => document.getElementById("modes")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 text-sm font-bold flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
        >
          Scroll to explore
          <span className="animate-bounce">↓</span>
        </button>
        
        <div className="text-sm font-medium text-black/60 text-right hidden md:block">
          Portfolio ©2026
        </div>
      </div>

    </section>
  );
}
