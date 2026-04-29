"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, MotionValue } from "framer-motion";

// Interest tag data with descriptions
const INTERESTS = [
  // Creative interests
  { label: "WebGL", size: "lg", rotation: -3, description: "Pushing browsers beyond flat pages — shaders, particle systems, and real-time 3D that runs everywhere.", x: 5, y: 8, color: "bg-white" },
  { label: "Typography", size: "xl", rotation: 2, description: "The shape of letters changes how ideas feel. I spend hours kerning things nobody will notice.", x: 52, y: 4, color: "bg-white" },
  { label: "Brutalism", size: "lg", rotation: -2, description: "Raw, honest, unapologetic design. No decoration for decoration's sake.", x: 28, y: 28, color: "bg-white" },
  { label: "CSS Experiments", size: "sm", rotation: 4, description: "Making browsers do things they were never designed to do. Pure CSS art is my meditation.", x: 82, y: 48, color: "bg-white" },
  { label: "System Design", size: "lg", rotation: 1, description: "How things connect matters more than how they look. Architecture is invisible design.", x: 18, y: 82, color: "bg-white" },
  { label: "Motion Design", size: "md", rotation: -1, description: "If it doesn't move with intention, it shouldn't move at all. Easing curves are my love language.", x: 6, y: 50, color: "bg-white" },
  // Personality traits
  { label: "☕ Coffee > Tea", size: "md", rotation: 3, description: "Non-negotiable. Black coffee, no sugar. Tea is for people who've given up.", x: 72, y: 6, color: "bg-amber-200" },
  { label: "⚡ Low Attention Span", size: "lg", rotation: -1, description: "I open 47 tabs, start 3 side projects, and forget what I was originally doing. Every. Single. Day.", x: 58, y: 30, color: "bg-red-200" },
  { label: "🧪 New Tech Junkie", size: "md", rotation: 2, description: "If it just launched, I'm already reading the docs. Bleeding edge is where the fun lives.", x: 40, y: 55, color: "bg-blue-200" },
  { label: "🌙 Night Owl", size: "sm", rotation: -3, description: "My best code happens between midnight and 4AM. Mornings are a myth.", x: 85, y: 28, color: "bg-indigo-200" },
  { label: "🎧 Always Plugged In", size: "md", rotation: 1, description: "Music isn't background noise — it's the operating system. Can't think without a beat.", x: 12, y: 68, color: "bg-purple-200" },
  { label: "🔥 Ctrl+Z Addict", size: "sm", rotation: -2, description: "I undo more than I do. Perfectionism disguised as productivity.", x: 65, y: 72, color: "bg-orange-200" },
  { label: "📱 Dark Mode Only", size: "sm", rotation: 3, description: "Light mode is violence. Every app, every device, every IDE — pitch black.", x: 48, y: 82, color: "bg-gray-300" },
  { label: "🧠 Overthinks UI", size: "md", rotation: -1, description: "Should that button be 2px or 3px from the edge? Let me spend 40 minutes deciding.", x: 78, y: 65, color: "bg-yellow-200" },
  { label: "Video Essays", size: "sm", rotation: -3, description: "4-hour deep dives on niche topics at 2AM. The algorithm knows me too well.", x: 35, y: 42, color: "bg-white" },
  { label: "Lo-fi Aesthetics", size: "sm", rotation: 2, description: "Grain, noise, warmth. Imperfection is the most human texture.", x: 90, y: 82, color: "bg-white" },
];

type Interest = (typeof INTERESTS)[number];

const SIZE_CLASSES: Record<string, string> = {
  sm: "text-sm md:text-base px-4 py-2",
  md: "text-base md:text-lg px-5 py-3",
  lg: "text-lg md:text-xl px-6 py-3",
  xl: "text-xl md:text-2xl px-7 py-4",
};

export default function InterestCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedTag, setExpandedTag] = useState<string | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  // Mouse tracking for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 px-6 md:px-12 border-b-4 border-black relative overflow-hidden bg-[#f5f0ea]"
    >
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz4KPC9zdmc+')]"></div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto relative z-20 mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
        >
          Rabbit Holes I Explore
        </motion.h2>
        <p className="text-sm md:text-base font-bold uppercase tracking-widest text-black/40 mt-2">
          Hover a tag to dive in
        </p>
      </div>

      {/* Interest Cloud — Desktop: absolute positioned, Mobile: wrapped flex */}
      <div className="relative w-full min-h-[550px] md:min-h-[600px] hidden md:block">
        {INTERESTS.map((interest, i) => (
          <InterestTag
            key={interest.label}
            interest={interest}
            index={i}
            mouseX={mouseX}
            mouseY={mouseY}
            isExpanded={hoveredTag === interest.label}
            isHovered={hoveredTag === interest.label}
            isAnotherHovered={hoveredTag !== null && hoveredTag !== interest.label}
            isAnotherExpanded={hoveredTag !== null && hoveredTag !== interest.label}
            onExpand={() => {}}
            onHover={() => setHoveredTag(interest.label)}
            onLeave={() => setHoveredTag(null)}
            positioned
          />
        ))}
      </div>

      {/* Mobile: Clean wrapped layout */}
      <div className="flex flex-wrap gap-3 md:hidden mt-8">
        {INTERESTS.map((interest, i) => (
          <InterestTag
            key={interest.label}
            interest={interest}
            index={i}
            mouseX={mouseX}
            mouseY={mouseY}
            isExpanded={expandedTag === interest.label}
            isHovered={false}
            isAnotherHovered={false}
            isAnotherExpanded={expandedTag !== null && expandedTag !== interest.label}
            onExpand={() => setExpandedTag(expandedTag === interest.label ? null : interest.label)}
            onHover={() => {}}
            onLeave={() => {}}
            positioned={false}
          />
        ))}
      </div>
    </section>
  );
}

// Individual interactive tag component
function InterestTag({
  interest,
  index,
  mouseX,
  mouseY,
  isExpanded,
  isHovered,
  isAnotherHovered,
  isAnotherExpanded,
  onExpand,
  onHover,
  onLeave,
  positioned,
}: {
  interest: Interest;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isExpanded: boolean;
  isHovered: boolean;
  isAnotherHovered: boolean;
  isAnotherExpanded: boolean;
  onExpand: () => void;
  onHover: () => void;
  onLeave: () => void;
  positioned: boolean;
}) {
  // Magnetic pull toward cursor (desktop only)
  const pullStrength = 0.02;
  const centerX = (interest.x / 100) * 1200;
  const centerY = (interest.y / 100) * 550;
  const magX = useTransform(mouseX, (mx) => (mx - centerX) * pullStrength);
  const magY = useTransform(mouseY, (my) => (my - centerY) * pullStrength);
  const springX = useSpring(magX, { damping: 30, stiffness: 120 });
  const springY = useSpring(magY, { damping: 30, stiffness: 120 });

  // Gentle idle float
  const floatDelay = index * 0.6;

  return (
    <motion.div
      style={positioned ? { left: `${interest.x}%`, top: `${interest.y}%`, x: springX, y: springY } : undefined}
      className={positioned ? "absolute z-10" : ""}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
    >
      {/* Float wrapper */}
      <motion.div
        animate={positioned ? { y: [0, -6, 0, 4, 0] } : {}}
        transition={{ duration: 5 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      >
        <motion.button
          onClick={onExpand}
          onMouseEnter={() => { onHover(); }}
          onMouseLeave={() => { onLeave(); }}
          animate={{
            scale: isExpanded ? 1.12 : isHovered ? 1.08 : isAnotherHovered ? 0.95 : 1,
            rotateZ: isExpanded ? 0 : interest.rotation,
            opacity: isAnotherExpanded ? 0.3 : isAnotherHovered ? 0.6 : 1,
            borderWidth: isHovered || isExpanded ? "5px" : "3px",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`
            ${SIZE_CLASSES[interest.size]}
            font-black uppercase tracking-tight cursor-pointer
            border-black ${interest.color}
            shadow-[4px_4px_0_0_#000]
            hover:shadow-[6px_6px_0_0_#000]
            active:shadow-[2px_2px_0_0_#000]
            transition-shadow relative select-none
            ${isExpanded ? "!bg-yellow-300 z-50" : "z-10"}
          `}
          style={{ borderStyle: "solid" }}
        >
          {interest.label}
        </motion.button>

        {/* Expanded panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-0 top-full mt-2 w-64 md:w-72 bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl p-4 shadow-2xl z-[60]"
            >
              <p className="text-sm font-bold leading-relaxed text-black/90">
                {interest.description}
              </p>
              <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
