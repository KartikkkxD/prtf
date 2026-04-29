"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import ProjectTimeline from "@/components/ProjectTimeline";
import SkillsSection from "@/components/SkillsSection";
import ProfessionalHero from "@/components/ProfessionalHero";

// Inline SVG icons for GitHub and LinkedIn (not available in this lucide version)
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);
const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

gsap.registerPlugin(ScrollTrigger);


const TIMELINE = [
  { year: "2025 — Now", label: "Shipped", title: "Nextera Labs", desc: "Flagship product · nextera-labs.in", detail: "Built and launched the marketing site + cohort acquisition funnel for India's first peer-led AI builder community.", badge: "Lighthouse 92+ · LCP < 1.8s" },
  { year: "2025", label: "Shipped", title: "SproutCircle", desc: "Multi-tenant daycare platform", detail: "Real-time child-tracking on MongoDB change streams. Compound indexes + roster caching cut schedule-endpoint latency ~60%.", badge: "Node · Express · MongoDB" },
  { year: "2024", label: "Certified", title: "Meta Backend Developer", desc: "Coursera", detail: "Production backend patterns: REST API design, auth, deployment, and database integration." },
  { year: "2024", label: "Certified", title: "Data Structures", desc: "UC San Diego · Coursera", detail: "Foundational DSA — arrays, trees, hash tables, priority queues." },
  { year: "2022 — 2027", label: "Education", title: "B.Tech, CSE", desc: "Bennett University", detail: "CGPA 7.21/10. Coursework: DSA, OOP, DBMS, OS, Networks.", badge: "In progress · 3rd year" },
];

// ─── Component ───────────────────────────────────────────────────────
export default function ProfessionalPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={heroRef} className="relative w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ─── Nav ─── */}
      <nav className="pro-fade fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-[var(--background)]/80 backdrop-blur-lg border-b border-black/5">
        <div className="flex-1 flex items-center gap-6">
          <Link href="/" className="font-heading font-bold text-lg tracking-tight hover:opacity-60 transition-opacity">K.</Link>
          <Link href="/" className="hidden md:flex text-xs font-bold opacity-50 hover:opacity-100 transition-opacity items-center gap-1"><ArrowLeft size={12}/>HOME</Link>
        </div>
        <div className="hidden md:flex flex-none items-center justify-center gap-8 text-sm font-semibold text-black/70">
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
          <a href="#experience" className="hover:text-black transition-colors">Experience</a>
          <a href="#skills" className="hover:text-black transition-colors">Skills</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <a href="#contact" className="px-5 py-2.5 rounded-full bg-[#2b2b2b] text-white text-xs font-bold hover:bg-black transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95">Get in touch</a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <ProfessionalHero />

      {/* ─── Projects ─── */}
      <ProjectTimeline />

      {/* ─── Experience Timeline ─── */}
      <section id="experience" className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
        <div className="scroll-reveal mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Journey</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Experience &amp; Education</h2>
        </div>
        <div className="relative border-l-2 border-black/10 ml-4 md:ml-8 space-y-12">
          {TIMELINE.map((item, i) => (
            <div key={i} className="scroll-reveal relative pl-8 md:pl-12">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--accent)] border-2 border-[var(--background)]" />
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-1">{item.year} · {item.label}</p>
              <h3 className="text-xl font-heading font-bold">{item.title}</h3>
              <p className="text-sm font-semibold text-black/50 mb-2">{item.desc}</p>
              <p className="text-sm text-black/60 font-medium leading-relaxed">{item.detail}</p>
              {item.badge && <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-xs font-bold">{item.badge}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Skills ─── */}
      <SkillsSection />

      {/* ─── About ─── */}
      <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto">
        <div className="scroll-reveal">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">About</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-8">How I Operate</h2>
        </div>
        <div className="scroll-reveal space-y-6 text-lg font-medium leading-relaxed text-black/70">
          <p>Full-stack developer with production experience across MERN and React Native. I've shipped a live EdTech enrollment funnel, built a cross-platform mobile scheduling app, and created GitHub developer tooling.</p>
          <p>I care about performance first — a landing page that takes 4 seconds on a Tier-2 Indian phone never gets to make its pitch. Strong DSA fundamentals inform every index, cache, and query decision I make.</p>
          <p>A v0.5 in production beats a v1.0 in localhost. Real users expose what tests and instincts never will.</p>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="px-6 md:px-12 py-24 max-w-4xl mx-auto">
        <div className="scroll-reveal rounded-3xl p-8 md:p-12 bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none rounded-3xl" />
          <div className="relative z-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Let's Connect</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">Open to collaboration on serious products.</h2>
            <p className="text-black/60 font-medium mb-10">Especially interested in EdTech, dev tooling, and anything that needs to feel fast on real networks.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="mailto:kartikays093@gmail.com" className="group flex items-center gap-3 p-4 rounded-xl hover:bg-black/5 transition-colors">
                <div className="p-2 rounded-lg bg-black/5 group-hover:bg-[#2b2b2b] group-hover:text-white transition-colors"><Mail size={18}/></div>
                <div><p className="text-sm font-bold">Email</p><p className="text-xs text-black/50">kartikays093@gmail.com</p></div>
              </a>
              <a href="https://github.com/KartikkkxD" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 rounded-xl hover:bg-black/5 transition-colors">
                <div className="p-2 rounded-lg bg-black/5 group-hover:bg-[#2b2b2b] group-hover:text-white transition-colors"><GithubIcon size={18}/></div>
                <div><p className="text-sm font-bold">GitHub</p><p className="text-xs text-black/50">KartikkkxD</p></div>
              </a>
              <a href="https://www.linkedin.com/in/kartikay-sharma-b1044a28b/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 rounded-xl hover:bg-black/5 transition-colors">
                <div className="p-2 rounded-lg bg-black/5 group-hover:bg-[#2b2b2b] group-hover:text-white transition-colors"><LinkedinIcon size={18}/></div>
                <div><p className="text-sm font-bold">LinkedIn</p><p className="text-xs text-black/50">Kartikay Sharma</p></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-6 md:px-12 py-8 text-center text-sm text-black/40 font-medium border-t border-black/5">
        <p>© 2026 Kartikay Sharma · Built to ship.</p>
        <p className="text-xs mt-1">Next.js · Tailwind · Framer Motion · GSAP</p>
      </footer>
    </main>
  );
}
