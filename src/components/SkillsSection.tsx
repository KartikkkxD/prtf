"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SKILLS: Record<string, { items: string[]; primary: string[] }> = {
  Frontend: { items: ["React.js", "React Native", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion", "HTML5", "CSS3"], primary: ["React.js", "Tailwind CSS"] },
  Backend: { items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "WebSockets"], primary: ["Node.js", "Express.js"] },
  Databases: { items: ["MongoDB", "Firebase"], primary: ["MongoDB"] },
  Languages: { items: ["JavaScript", "Python", "Java", "C++"], primary: ["JavaScript"] },
  Tooling: { items: ["Git", "Docker", "Postman", "Vercel", "GitHub API"], primary: [] },
};

export default function SkillsSection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="relative px-6 md:px-12 py-32 max-w-7xl mx-auto overflow-visible">
      <div className="scroll-reveal mb-20 text-center md:text-left">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Technical Stack</p>
        <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Tools &amp; Tech</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {Object.entries(SKILLS).map(([category, { items, primary }]) => {
          const isHovered = hoveredCategory === category;
          const isOtherHovered = hoveredCategory !== null && !isHovered;

          return (
            <motion.div
              key={category}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="scroll-reveal relative"
              animate={{ 
                scale: isHovered ? 1.05 : 1,
                filter: isOtherHovered ? "blur(8px)" : "blur(0px)",
                opacity: isOtherHovered ? 0.4 : 1,
                zIndex: isHovered ? 10 : 1
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className={`h-full rounded-3xl p-8 transition-all duration-500 border ${
                isHovered 
                  ? "bg-white/95 border-[var(--accent)] shadow-[0_30px_100px_rgba(0,0,0,0.15)]" 
                  : "bg-white/40 border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
              } backdrop-blur-md`}>
                <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 transition-colors duration-300 ${
                  isHovered ? "text-[var(--accent)]" : "text-black/40"
                }`}>
                  {category}
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {items.map(skill => {
                    const isPrimary = primary.includes(skill);
                    return (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.1, backgroundColor: "#2b2b2b", color: "#fff" }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-default border ${
                          isPrimary 
                            ? "bg-[var(--accent)]/10 border-[var(--accent)]/20 text-[var(--accent)]" 
                            : "bg-black/5 border-transparent text-black/60"
                        }`}
                      >
                        {skill}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
