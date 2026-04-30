"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProfessionalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const tickerTween = useRef<gsap.core.Tween | null>(null);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ticker animation
      const tickerContent = tickerRef.current;
      if (tickerContent) {
        tickerTween.current = gsap.to(tickerContent, {
          xPercent: -50,
          ease: "none",
          duration: 60, // Base speed
          repeat: -1,
        });
      }

      // Initial reveal
      gsap.fromTo(
        ".hero-reveal",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".hero-fade",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1, ease: "power2.out" }
      );

      // Scroll effect - slow down ticker and move slightly
      if (containerRef.current && tickerContent) {
        gsap.to(tickerContent, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          y: -50,
          opacity: 0,
        });

        // Parallax for name
        gsap.to(nameRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 100,
          scale: 0.95,
          opacity: 0.2,
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (tickerTween.current) {
      gsap.to(tickerTween.current, { timeScale: 2.5, duration: 0.8, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tickerTween.current) {
      gsap.to(tickerTween.current, { timeScale: 1, duration: 0.8, ease: "power2.out" });
    }
  };

  const tickerText = "FULL-STACK DEVELOPER · MERN · REACT NATIVE · PERFORMANCE-FIRST · SHIPPING FAST · ";

  return (
    <section
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-10"
    >
      {/* Ticker Background */}
      <div className="absolute top-1/2 -translate-y-[60%] w-full flex overflow-hidden whitespace-nowrap opacity-[0.06] pointer-events-none select-none z-0">
        <div ref={tickerRef} className="flex shrink-0 will-change-transform">
          <span className="text-[12vw] leading-none font-heading font-black tracking-tight px-4 text-[var(--accent)]">
            {tickerText}
          </span>
          <span className="text-[12vw] leading-none font-heading font-black tracking-tight px-4 text-[var(--accent)]">
            {tickerText}
          </span>
        </div>
      </div>

      {/* Main Identity */}
      <motion.div
        ref={nameRef}
        className="relative z-10 flex flex-col items-center justify-center text-center cursor-default pointer-events-auto"
        animate={{
          scale: isHovered ? 1.05 : 1,
          textShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.1)" : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="overflow-hidden z-20 relative">
          <h1 className="hero-reveal text-[13vw] md:text-[9vw] leading-[0.8] font-heading font-black tracking-tighter text-[var(--foreground)] drop-shadow-sm">
            Kartikay
          </h1>
        </div>
        <div className="overflow-hidden -mt-3 md:-mt-8 ml-14 md:ml-36 z-10 relative">
          <h1 className="hero-reveal text-[11vw] md:text-[7vw] leading-[0.8] font-serif italic text-black/40">
            Sharma
          </h1>
        </div>
      </motion.div>

      {/* Intro text */}
      <div className="relative z-10 mt-16 max-w-xl text-center px-6 pointer-events-none">
        <p className="hero-fade text-lg md:text-xl font-medium leading-relaxed text-black/70">
          Shipping fast, performance-driven web and mobile products. From startup enrollment funnels to cross-platform apps — I build systems that work on real networks for real users.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="relative z-20 hero-fade mt-10 flex flex-wrap justify-center gap-4">
        <a
          href="https://drive.google.com/file/d/1j9tPE7ppRKrujE-Y0prCFg-GGuSHHv78/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-[#1a1a1a] text-white rounded-2xl font-semibold hover:bg-black transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95"
        >
          Get CV
        </a>
        <a
          href="#contact"
          className="px-8 py-4 border border-black/20 rounded-2xl font-semibold hover:bg-black/5 transition-all hover:-translate-y-1 bg-white/50 backdrop-blur-sm"
        >
          Contact
        </a>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center hero-fade pointer-events-none">
        <div className="flex items-center gap-6 text-sm text-black/50 font-medium">
          <span>✦ Based in Greater Noida</span>
          <span>·</span>
          <span>Open to opportunities</span>
        </div>
      </div>
    </section>
  );
}
