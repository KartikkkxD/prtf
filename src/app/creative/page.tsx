"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { ArrowLeft, Play, ArrowUpRight } from "lucide-react";
import FloatingMusic from "@/components/FloatingMusic";
import InteractionLab from "@/components/InteractionLab";
import InterestCloud from "@/components/InterestCloud";

export default function CreativeMode() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom cursor follower
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    
    // Initial GSAP reveal
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".neo-reveal",
        { y: 50, opacity: 0, rotation: 5 },
        { y: 0, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" }
      );
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      ctx.revert();
    };
  }, [cursorX, cursorY]);

  return (
    <main 
      ref={containerRef} 
      className="relative min-h-screen w-full bg-[#fcfcfc] text-black font-sans overflow-hidden selection:bg-red-500 selection:text-white"
    >
      {/* Custom neo-brutalist cursor (hidden on mobile) */}
      <motion.div
        style={{ x: cursorXSpring, y: cursorYSpring }}
        className="fixed top-0 left-0 w-8 h-8 bg-red-500 mix-blend-difference rounded-full pointer-events-none z-50 hidden md:block"
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-[#fcfcfc] border-b-4 border-black">
        <div className="font-heading font-black text-2xl tracking-tighter uppercase">Chaos<span className="text-red-500">.</span></div>
        <Link href="/">
          <button className="px-4 py-2 border-2 border-black font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors brutalist-shadow">
            Exit
          </button>
        </Link>
      </nav>

      {/* 1. Hero Section */}
      <section className="min-h-screen pt-32 px-6 md:px-12 flex flex-col justify-center relative border-b-4 border-black bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block px-3 py-1 bg-red-500 text-white font-bold uppercase text-sm border-2 border-black shadow-[4px_4px_0_0_#000] mb-8 rotate-[-2deg]"
          >
            Warning: Unfiltered Ideas
          </motion.div>
          
          <h1 className="neo-reveal text-6xl md:text-[9vw] font-black uppercase leading-[0.85] tracking-tighter relative group">
            <span className="relative z-10 bg-[#fcfcfc] inline-block pr-4">This is the</span><br/>
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 group-hover:skew-x-12 transition-transform duration-300">Creative</span> 
            <span className="relative inline-block ml-4 hover:-translate-y-2 transition-transform">Side.</span>
            
            {/* Glitch layers */}
            <span className="absolute top-0 left-0 -z-10 text-blue-500 translate-x-[4px] translate-y-[4px] opacity-0 group-hover:opacity-100 transition-opacity">Creative</span>
            <span className="absolute top-0 left-0 -z-10 text-red-500 -translate-x-[4px] -translate-y-[4px] opacity-0 group-hover:opacity-100 transition-opacity">Creative</span>
          </h1>
          
          {/* Floating 3D Element */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotateZ: [0, 10, -10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-10 top-1/2 w-32 h-32 md:w-64 md:h-64 border-4 border-black bg-yellow-300 shadow-[12px_12px_0_0_#000] flex items-center justify-center overflow-hidden -z-0 hidden md:flex"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sigma.gif" alt="Floating graphic" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* 2. Floating Music Interactive Experience */}
      <FloatingMusic />

      {/* 3. Interest Cloud */}
      <InterestCloud />

      {/* 3. Playground / Interaction Lab */}
      <InteractionLab />

      {/* 4. How I Think */}
      <section className="py-32 px-6 md:px-12 bg-[#fcfcfc] border-b-4 border-black">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          <h2 className="text-xl font-bold uppercase tracking-widest text-red-500">How I Think</h2>
          
          {[
            "I hate slow interfaces.",
            "If it doesn’t feel smooth, it’s broken.",
            "Good UI is invisible until it’s not."
          ].map((statement, i) => (
            <motion.div 
              key={i}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group cursor-default"
            >
              <h3 className="text-4xl md:text-7xl font-black uppercase leading-none tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-purple-500 transition-all duration-300">
                {statement}
              </h3>
              <motion.div 
                variants={{
                  rest: { width: "0%", height: "4px" },
                  hover: { width: "100%", height: "4px" }
                }}
                className="bg-black mt-4"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Socials */}
      <section className="py-24 px-6 md:px-12 border-b-4 border-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="https://discordapp.com/users/970719265525219408" target="_blank" rel="noopener noreferrer" className="block">
            <motion.div 
              whileHover={{ x: -4, y: -4, boxShadow: "8px 8px 0px 0px #000" }}
              className="border-4 border-black p-8 bg-[#5865F2] text-white shadow-[4px_4px_0_0_#000] flex justify-between items-center transition-all"
            >
              <span className="text-2xl font-black uppercase">Discord</span>
              <ArrowUpRight size={32} />
            </motion.div>
          </a>
          <a href="https://www.instagram.com/sojakartik/" target="_blank" rel="noopener noreferrer" className="block">
            <motion.div 
              whileHover={{ x: -4, y: -4, boxShadow: "8px 8px 0px 0px #000" }}
              className="border-4 border-black p-8 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white shadow-[4px_4px_0_0_#000] flex justify-between items-center transition-all"
            >
              <span className="text-2xl font-black uppercase">Instagram</span>
              <ArrowUpRight size={32} />
            </motion.div>
          </a>
          <a href="https://www.linkedin.com/in/kartikay-sharma-b1044a28b/" target="_blank" rel="noopener noreferrer" className="block">
            <motion.div 
              whileHover={{ x: -4, y: -4, boxShadow: "8px 8px 0px 0px #000" }}
              className="border-4 border-black p-8 bg-[#0077b5] text-white shadow-[4px_4px_0_0_#000] flex justify-between items-center transition-all"
            >
              <span className="text-2xl font-black uppercase">LinkedIn</span>
              <ArrowUpRight size={32} />
            </motion.div>
          </a>
        </div>
      </section>

      {/* 6. Outro */}
      <section className="py-40 px-6 md:px-12 bg-yellow-300 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">You’ve seen the chaos.</h2>
        <p className="text-xl font-bold mb-12">Now go back to the clean side.</p>
        
        <Link href="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-black text-white font-black uppercase text-xl border-4 border-black hover:bg-white hover:text-black transition-colors shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] flex items-center gap-4"
          >
            <ArrowLeft /> Back to Professional Mode
          </motion.button>
        </Link>
      </section>

      {/* Custom Styles for this page */}
      <style dangerouslySetInnerHTML={{__html: `
        .brutalist-shadow {
          box-shadow: 4px 4px 0px 0px #000;
        }
        .stroke-text {
          color: transparent;
          -webkit-text-stroke: 2px white;
        }
      `}} />
    </main>
  );
}
