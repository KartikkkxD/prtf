"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);

// ─── Project Data ────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "nextera",
    title: "Nextera Labs",
    label: "Startup Website",
    summary: "Shipped the flagship marketing site for an EdTech startup targeting 16–21 year olds, driving end-to-end enrollment for two paid cohorts.",
    highlights: [
      "Multi-step enrollment flow — lead-response time cut from hours to under 5 minutes",
      "Reusable Tailwind design-token config shared across the team",
    ],
    stack: ["React", "Tailwind CSS", "Framer Motion", "Node.js", "Google Forms API"],
    live: "https://nextera-labs.in",
  },
  {
    id: "prepify",
    title: "Prepify",
    label: "Mobile App",
    summary: "Built an iOS/Android app that generates personalized exam prep schedules, letting students map study sessions to their syllabus and deadlines.",
    highlights: [
      "Context API for global state across schedule creation and progress flows",
      "Custom StyleSheet system — consistent native UI without third-party libraries",
      "Deterministic scheduling engine with priority-based task distribution",
    ],
    stack: ["React Native", "Expo", "React Navigation", "Context API"],
    github: "https://github.com/KartikkkxD/Prepify",
  },
  {
    id: "github-viz",
    title: "GitHub Profile Visualiser",
    label: "Developer Tool",
    summary: "A web tool that renders a visual breakdown of any GitHub user's repos, stars, and language distribution via the GitHub API.",
    highlights: [
      "API rate-limiting with request queuing and user-facing feedback",
      "Real-time data visualization of repository statistics",
      "Reliable data fetching without dropped requests",
    ],
    stack: ["React", "Node.js", "GitHub API"],
    live: "https://profile-visualizer-red.vercel.app/",
    github: "https://github.com/KartikkkxD/Profile-Visualizer",
  },
];

// ─── Glass Detail Panel ──────────────────────────────────────────────
function GlassDetailPanel({ project, side }: { project: typeof PROJECTS[number]; side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, x: side === "left" ? -10 : 10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.96, x: side === "left" ? -10 : 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`absolute top-0 w-[300px] md:w-[420px] z-50 ${side === "left" ? "left-full pl-6" : "right-full pr-6"}`}
    >
      <div className="bg-white/20 backdrop-blur-3xl border border-white/40 rounded-3xl p-8 shadow-[0_30px_100px_rgba(0,0,0,0.18)] relative overflow-hidden group">
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl pointer-events-none" />

        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-2">{project.label}</p>
          <h3 className="text-2xl font-heading font-bold tracking-tight mb-4">{project.title}</h3>
          <p className="text-sm font-medium leading-relaxed text-black/70 mb-6">{project.summary}</p>

          {/* Highlights */}
          <div className="space-y-3 mb-8">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 text-xs text-black/60 font-medium leading-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-black/5 border border-black/5 text-[10px] font-bold">{t}</span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2b2b2b] text-white text-xs font-bold hover:bg-black hover:scale-[1.02] transition-all active:scale-[0.98]">
                <ExternalLink size={14} />Visit Site
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-black/15 text-xs font-bold hover:bg-black/5 hover:scale-[1.02] transition-all active:scale-[0.98]">
                <GithubIcon size={14} />Source
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Timeline Item ───────────────────────────────────────────────────
function TimelineItem({ project, index, isActive, onHover, onLeave }: {
  project: typeof PROJECTS[number];
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <div className={`relative flex items-start ${side === "left" ? "justify-start" : "justify-end"} w-full min-h-[160px]`}>
      {/* Connector to center line */}
      <motion.div 
        className={`absolute top-8 ${side === "left" ? "right-1/2 left-auto" : "left-1/2 right-auto"} h-[2px] z-0`}
        initial={{ width: 0 }}
        whileInView={{ width: "calc(50% - 32px)" }}
        viewport={{ once: true }}
        animate={{ 
          backgroundColor: isActive ? "#b59f8c" : "rgba(0,0,0,0.08)",
          height: isActive ? "2px" : "1px"
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Timeline dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-6 z-20"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        animate={{
          scale: isActive ? 1.5 : 1,
          backgroundColor: isActive ? "#b59f8c" : "#e2d9ce",
          boxShadow: isActive ? `0 0 20px #b59f8c` : "none",
          zIndex: isActive ? 50 : 20
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-4 h-4 rounded-full border-[3px] border-[var(--background)]" style={{ backgroundColor: "inherit" }} />
      </motion.div>

      <motion.div
        className={`relative w-[calc(50%-60px)] ${side === "right" ? "ml-auto" : ""}`}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        animate={{ zIndex: isActive ? 50 : 1 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="rounded-2xl p-6 bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative z-10"
          animate={{
            boxShadow: isActive ? "0 20px 50px rgba(0,0,0,0.15)" : "0 10px 30px rgba(0,0,0,0.04)",
            borderColor: isActive ? "#b59f8c" : "rgba(255,255,255,0.4)",
            scale: isActive ? 1.02 : 1,
            backgroundColor: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)"
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">{project.label}</p>
            {isActive && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />}
          </div>
          <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tight">{project.title}</h3>
          <motion.p 
            className="text-xs text-black/40 font-bold mt-2 flex items-center gap-2"
            animate={{ opacity: isActive ? 0 : 1 }}
          >
            VIEW DETAILS <span className="text-[var(--accent)]">→</span>
          </motion.p>
        </motion.div>

        {/* Glass Detail Panel */}
        <AnimatePresence>
          {isActive && (
            <GlassDetailPanel project={project} side={side} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ─── Mobile Item ─────────────────────────────────────────────────────
function MobileTimelineItem({ project, index, isExpanded, onTap }: {
  project: typeof PROJECTS[number];
  index: number;
  isExpanded: boolean;
  onTap: () => void;
}) {
  return (
    <div className="relative pl-8">
      {/* Dot */}
      <motion.div
        className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-[3px] border-[var(--background)]"
        animate={{ backgroundColor: isExpanded ? "#b59f8c" : "#e2d9ce" }}
        transition={{ duration: 0.3 }}
      />

      {/* Card */}
      <div onClick={onTap} className="cursor-pointer">
        <div className="rounded-xl p-4 bg-white/50 backdrop-blur-sm border border-white/40 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--accent)] mb-1">{project.label}</p>
          <h3 className="text-base font-heading font-bold tracking-tight">{project.title}</h3>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 bg-white/15 backdrop-blur-xl border border-white/25 rounded-xl p-5 shadow-lg">
              <p className="text-sm font-medium leading-relaxed text-black/65 mb-4">{project.summary}</p>
              <ul className="space-y-1.5 mb-4">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-black/60 font-medium">
                    <span className="text-[var(--accent)] mt-px shrink-0">▸</span><span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.map(t => <span key={t} className="px-2.5 py-1 rounded-full bg-black/5 text-[10px] font-bold">{t}</span>)}
              </div>
              <div className="flex gap-2">
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2b2b2b] text-white text-xs font-semibold"><ExternalLink size={12}/>Live</a>}
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-black/10 text-xs font-semibold"><GithubIcon size={12}/>Code</a>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function ProjectTimeline() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="relative px-6 md:px-12 py-32 max-w-7xl mx-auto overflow-visible">
      {/* Background Space Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/40 to-transparent pointer-events-none" />
      
      <div className="scroll-reveal mb-24 text-center md:text-left">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Selected Work</p>
        <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Built &amp; Shipped</h2>
      </div>

      {/* Desktop Timeline */}
      <div className="relative hidden md:flex flex-col gap-20">
        {/* Center guide line */}
        <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-black/6" />

        {PROJECTS.map((project, i) => {
          const isActive = activeProject === project.id;
          const isOtherActive = activeProject !== null && !isActive;

          return (
            <motion.div 
              key={project.id} 
              className="scroll-reveal relative" 
              animate={{
                opacity: isOtherActive ? 0.3 : 1,
                scale: isOtherActive ? 0.98 : 1,
                zIndex: isActive ? 20 : 1
              }}
              transition={{ duration: 0.4 }}
            >
              <TimelineItem
                project={project}
                index={i}
                isActive={isActive}
                onHover={() => setActiveProject(project.id)}
                onLeave={() => setActiveProject(null)}
              />
            </motion.div>
          );
        })}

        {/* End dot */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-3 h-3 rounded-full bg-black/10" />
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden relative border-l-2 border-black/8 ml-2 space-y-6">
        {PROJECTS.map((project, i) => (
          <MobileTimelineItem
            key={project.id}
            project={project}
            index={i}
            isExpanded={mobileExpanded === project.id}
            onTap={() => setMobileExpanded(mobileExpanded === project.id ? null : project.id)}
          />
        ))}
      </div>
    </section>
  );
}
