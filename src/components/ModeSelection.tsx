"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Briefcase, Paintbrush } from "lucide-react";
import clsx from "clsx";

type Mode = "professional" | "creative" | null;

export default function ModeSelection() {
  const [activeMode, setActiveMode] = useState<Mode>(null);
  const router = useRouter();
  
  const modes = [
    {
      id: "professional" as Mode,
      label: "Professional",
      subtitle: "For recruiters & serious work",
      icon: <Briefcase size={24} />,
      colors: "hover:border-black/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]",
      className: "rounded-2xl bg-white/50 backdrop-blur-md border border-white/60",
    },
    {
      id: "creative" as Mode,
      label: "Creative",
      subtitle: "Experimental & expressive",
      icon: <Paintbrush size={24} />,
      colors: "hover:bg-[#b59f8c] hover:text-white hover:border-[#2b2b2b] brutalist-border",
      className: "rounded-none border-2 border-[#2b2b2b] bg-white/80",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {modes.map((mode, i) => (
        <motion.div
          key={mode.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
          whileHover={{ y: -5 }}
          onClick={() => {
            setActiveMode(mode.id);
            if (mode.id === "creative") {
              setTimeout(() => router.push("/creative"), 400);
            }
            if (mode.id === "professional") {
              setTimeout(() => router.push("/professional"), 400);
            }
          }}
          className={clsx(
            "relative p-8 cursor-pointer overflow-hidden transition-all duration-300 group",
            mode.className,
            mode.colors,
            activeMode === mode.id && "ring-2 ring-white"
          )}
        >
          {/* Subtle glow effect following cursor could be added here, but keeping it performant */}
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="p-3 bg-black/5 rounded-lg text-black group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all">
              {mode.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 font-heading text-black">{mode.label}</h3>
              <p className="text-black/60 text-sm font-medium">{mode.subtitle}</p>
            </div>
          </div>
          
          {/* Hover gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      ))}
      
      {/* Mock transitions to show what happens on click */}
      {activeMode && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="col-span-1 md:col-span-3 mt-10 p-8 bg-white/60 backdrop-blur-md rounded-2xl text-center border border-white/50"
        >
          <h2 className="text-2xl font-bold mb-4 capitalize text-black">Entering {activeMode} Mode...</h2>
          <p className="text-black/70 font-medium">
            {activeMode === "professional" && "Transitioning into a clean structured portfolio."}
            {activeMode === "creative" && "Transforming UI into a brutalist theme."}
          </p>
          <button 
            onClick={() => setActiveMode(null)}
            className="mt-6 px-4 py-2 bg-black/5 hover:bg-black/10 text-black rounded-full transition-colors text-sm font-semibold border border-black/10"
          >
            Go Back
          </button>
        </motion.div>
      )}
    </div>
  );
}
