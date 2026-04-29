"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Skill Tree Data ─────────────────────────────────────────────────
const TREE = [
  {
    id: "frontend",
    label: "Frontend",
    x: 15, y: 20,
    color: "#3b82f6",
    children: [
      { id: "react", label: "React.js", desc: "Primary UI library — component architecture, hooks, context, and performance optimization across every shipped project.", x: 5, y: 40, primary: true },
      { id: "rn", label: "React Native", desc: "Cross-platform mobile development with Expo. Built Prepify end-to-end for iOS & Android.", x: 22, y: 48, primary: true },
      { id: "nextjs", label: "Next.js", desc: "App Router, SSR, static generation — powering this very portfolio.", x: 8, y: 60, primary: false },
      { id: "tailwind", label: "Tailwind CSS", desc: "Utility-first styling with custom design tokens. Shared config across the Nextera Labs team.", x: 28, y: 35, primary: true },
      { id: "gsap", label: "GSAP", desc: "ScrollTrigger, staggered reveals, timeline-based animations. Performance-first motion.", x: 18, y: 68, primary: false },
      { id: "framer", label: "Framer Motion", desc: "Declarative animations, layout transitions, gesture-based interactions.", x: 32, y: 55, primary: false },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    x: 55, y: 15,
    color: "#10b981",
    children: [
      { id: "node", label: "Node.js", desc: "Server-side JavaScript — APIs, middleware, real-time services. Used in every backend I've shipped.", x: 48, y: 35, primary: true },
      { id: "express", label: "Express.js", desc: "RESTful API design, route middleware, error handling, auth flows.", x: 62, y: 40, primary: true },
      { id: "rest", label: "REST APIs", desc: "Designed and consumed production APIs — GitHub API, Google Forms API, custom endpoints.", x: 50, y: 55, primary: false },
      { id: "jwt", label: "JWT Auth", desc: "Token-based authentication and authorization flows for protected routes.", x: 65, y: 55, primary: false },
      { id: "ws", label: "WebSockets", desc: "Real-time communication — used in SproutCircle's live child-tracking module.", x: 55, y: 68, primary: false },
    ],
  },
  {
    id: "data",
    label: "Databases",
    x: 82, y: 25,
    color: "#f59e0b",
    children: [
      { id: "mongo", label: "MongoDB", desc: "Primary database — compound indexes, aggregation pipelines, change streams. Cut SproutCircle latency ~60%.", x: 78, y: 45, primary: true },
      { id: "firebase", label: "Firebase", desc: "Real-time database, authentication, and hosting for rapid prototyping.", x: 90, y: 50, primary: false },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    x: 40, y: 78,
    color: "#8b5cf6",
    children: [
      { id: "js", label: "JavaScript", desc: "Primary language across the full stack — ES6+, async patterns, closures, prototypes.", x: 30, y: 88, primary: true },
      { id: "python", label: "Python", desc: "Scripting, automation, and backend coursework.", x: 42, y: 92, primary: false },
      { id: "java", label: "Java", desc: "OOP fundamentals, data structures, university coursework.", x: 52, y: 88, primary: false },
      { id: "cpp", label: "C++", desc: "Competitive programming and systems-level understanding.", x: 38, y: 80, primary: false },
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    x: 78, y: 75,
    color: "#ec4899",
    children: [
      { id: "git", label: "Git", desc: "Version control, branching strategies, collaborative workflows.", x: 70, y: 85, primary: false },
      { id: "docker", label: "Docker", desc: "Containerized development environments and deployment.", x: 82, y: 88, primary: false },
      { id: "postman", label: "Postman", desc: "API testing, collection management, environment configs.", x: 90, y: 82, primary: false },
      { id: "vercel", label: "Vercel", desc: "Deployment platform of choice — CI/CD, preview deployments, edge functions.", x: 75, y: 70, primary: false },
    ],
  },
];

type Child = (typeof TREE)[number]["children"][number];
type Branch = (typeof TREE)[number];

// ─── SVG Line Component ──────────────────────────────────────────────
function ConnectionLine({ x1, y1, x2, y2, color, active }: { x1: number; y1: number; x2: number; y2: number; color: string; active: boolean }) {
  return (
    <motion.line
      x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
      stroke={color}
      strokeWidth={active ? 2.5 : 1}
      strokeOpacity={active ? 0.8 : 0.15}
      strokeDasharray={active ? "0" : "4 4"}
      initial={false}
      animate={{ strokeOpacity: active ? 0.8 : 0.15, strokeWidth: active ? 2.5 : 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

// ─── Skill Node Component ────────────────────────────────────────────
function SkillNode({ skill, color, isHovered, isOtherHovered, onEnter, onLeave }: {
  skill: Child;
  color: string;
  isHovered: boolean;
  isOtherHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="absolute flex flex-col items-center cursor-pointer"
      style={{ left: `${skill.x}%`, top: `${skill.y}%`, transform: "translate(-50%, -50%)" }}
      animate={{
        scale: isHovered ? 1.15 : isOtherHovered ? 0.9 : 1,
        opacity: isOtherHovered ? 0.35 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Node dot */}
      <motion.div
        className="rounded-full border-2 flex items-center justify-center shadow-lg relative z-10"
        style={{ borderColor: color, backgroundColor: isHovered ? color : "rgba(244,239,233,0.95)" }}
        animate={{
          width: isHovered ? 52 : skill.primary ? 40 : 32,
          height: isHovered ? 52 : skill.primary ? 40 : 32,
          boxShadow: isHovered ? `0 0 25px ${color}40` : `0 4px 12px rgba(0,0,0,0.08)`,
        }}
        transition={{ duration: 0.3 }}
      >
        <span className={`text-[10px] md:text-xs font-bold text-center leading-tight px-1 transition-colors duration-300 ${isHovered ? "text-white" : "text-[var(--foreground)]"}`}>
          {skill.label.length > 6 ? skill.label.slice(0, 5) + "." : skill.label}
        </span>
      </motion.div>

      {/* Label below node */}
      <motion.span
        className="mt-1.5 text-[10px] md:text-xs font-semibold whitespace-nowrap"
        animate={{ opacity: isOtherHovered ? 0.3 : 1 }}
        style={{ color: isHovered ? color : "var(--foreground)" }}
      >
        {skill.label}
      </motion.span>

      {/* Hover tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full mt-6 w-56 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl p-4 shadow-2xl z-[100]"
          >
            <p className="text-xs font-bold mb-1" style={{ color }}>{skill.label}</p>
            <p className="text-[11px] font-medium leading-relaxed text-[var(--foreground)]/80">{skill.desc}</p>
            {skill.primary && (
              <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider" style={{ backgroundColor: `${color}20`, color }}>Primary</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Category Hub Node ───────────────────────────────────────────────
function CategoryNode({ branch, isActive, isOtherActive, onEnter, onLeave }: {
  branch: Branch;
  isActive: boolean;
  isOtherActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="absolute cursor-pointer flex flex-col items-center"
      style={{ left: `${branch.x}%`, top: `${branch.y}%`, transform: "translate(-50%, -50%)" }}
      animate={{ scale: isActive ? 1.1 : isOtherActive ? 0.85 : 1, opacity: isOtherActive ? 0.4 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="rounded-full flex items-center justify-center border-[3px] shadow-xl relative z-20"
        style={{ borderColor: branch.color }}
        animate={{
          width: isActive ? 70 : 56,
          height: isActive ? 70 : 56,
          backgroundColor: isActive ? branch.color : "rgba(244,239,233,0.95)",
          boxShadow: isActive ? `0 0 40px ${branch.color}30` : "0 8px 24px rgba(0,0,0,0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        <span className={`text-xs md:text-sm font-black uppercase tracking-tight transition-colors duration-300 ${isActive ? "text-white" : ""}`}>
          {branch.label.slice(0, 4)}
        </span>
      </motion.div>
      <motion.span
        className="mt-2 text-xs md:text-sm font-bold uppercase tracking-wider"
        style={{ color: branch.color }}
        animate={{ opacity: isOtherActive ? 0.3 : 1 }}
      >
        {branch.label}
      </motion.span>
    </motion.div>
  );
}

// ─── Main Skill Tree ─────────────────────────────────────────────────
export default function SkillTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Determine which category is active (either directly hovered or has a hovered child)
  const activeCategory = hoveredCategory || TREE.find(b => b.children.some(c => c.id === hoveredSkill))?.id || null;

  return (
    <section id="skills" className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <div className="scroll-reveal mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Technical Stack</p>
        <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Skill Tree</h2>
        <p className="text-sm text-black/40 font-medium mt-2">Hover to explore connections</p>
      </div>

      {/* Desktop: Interactive tree */}
      <div ref={containerRef} className="relative w-full aspect-[16/9] hidden md:block rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-visible">
        
        {/* SVG Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {TREE.map(branch =>
            branch.children.map(child => (
              <ConnectionLine
                key={`${branch.id}-${child.id}`}
                x1={branch.x} y1={branch.y}
                x2={child.x} y2={child.y}
                color={branch.color}
                active={activeCategory === branch.id}
              />
            ))
          )}
        </svg>

        {/* Category Hub Nodes */}
        {TREE.map(branch => (
          <CategoryNode
            key={branch.id}
            branch={branch}
            isActive={activeCategory === branch.id}
            isOtherActive={activeCategory !== null && activeCategory !== branch.id}
            onEnter={() => setHoveredCategory(branch.id)}
            onLeave={() => setHoveredCategory(null)}
          />
        ))}

        {/* Skill Nodes */}
        {TREE.map(branch =>
          branch.children.map(child => (
            <SkillNode
              key={child.id}
              skill={child}
              color={branch.color}
              isHovered={hoveredSkill === child.id}
              isOtherHovered={hoveredSkill !== null && hoveredSkill !== child.id}
              onEnter={() => setHoveredSkill(child.id)}
              onLeave={() => setHoveredSkill(null)}
            />
          ))
        )}
      </div>

      {/* Mobile: Clean grouped layout */}
      <div className="md:hidden space-y-8">
        {TREE.map(branch => (
          <div key={branch.id} className="rounded-2xl p-5 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: branch.color }}>{branch.label}</h3>
            <div className="flex flex-wrap gap-2">
              {branch.children.map(child => (
                <span key={child.id} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${child.primary ? "border" : "bg-black/5"}`} style={child.primary ? { borderColor: `${branch.color}40`, backgroundColor: `${branch.color}10` } : {}}>
                  {child.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
