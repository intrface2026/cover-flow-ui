"use client";

import React, { useState } from "react";
import { Copy, Check, ChevronRight } from "lucide-react";
import { CoverFlow } from "./CoverFlow";
import { HelixFlow } from "./HelixFlow"; // Assuming HelixFlow is exported similarly

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeFlow, setActiveFlow] = useState<"cover" | "helix">("cover");

  const handleCopy = () => {
    navigator.clipboard.writeText("npx shadcn add https://intrface2026.github.io/vinyl-stack/registry/vinyl-stack.json");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center items-center overflow-hidden pt-32 pb-0 border-dashed border-border border-b-0">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-transparent dark:bg-black transition-colors duration-700"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Badge / Pill */}
        <div
          className="mb-6 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: "0.1s", transform: "translateY(20px)" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/40 backdrop-blur-sm transition-colors hover:bg-secondary/80 hover:border-border/80 cursor-default">
            <span className="flex h-1.5 w-1.5 rounded-full bg-foreground/70"></span>
            <span className="text-xs font-medium text-muted-foreground">
              A classic interaction, reimagined.
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1
          className="mb-4 tracking-tight animate-fade-in opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: "0.2s", transform: "translateY(20px)" }}
        >
          <span className="block text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tighter max-w-[20ch]">
            iOS-like VinylStack for React.
          </span>
        </h1>

        {/* Subtitle */}
        <div
          className="mb-8 max-w-[60ch] mx-auto animate-fade-in opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: "0.3s", transform: "translateY(20px)" }}
        >
          <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
            Fluid, physical motion with zero layout shifts.
            <br />
            <span className="group cursor-pointer">
              Built for the modern web with{" "}
              <span className="font-semibold transition-all duration-500 group-hover:text-sky-700 dark:group-hover:text-transparent dark:group-hover:bg-clip-text dark:group-hover:bg-gradient-to-r dark:group-hover:from-[#ded4c1] dark:group-hover:via-[#96d2ed] dark:group-hover:to-[#7583bc]">
                Motion
              </span>{" "}
              and{" "}
              <span className="font-semibold transition-all duration-500 group-hover:text-sky-700 dark:group-hover:text-transparent dark:group-hover:bg-clip-text dark:group-hover:bg-gradient-to-r dark:group-hover:from-[#ded4c1] dark:group-hover:via-[#96d2ed] dark:group-hover:to-[#7583bc]">
                Tailwind.
              </span>
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col mb-8 items-center gap-4 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: "0.4s", transform: "translateY(20px)" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/docs"
              className="h-11 px-6 rounded-md bg-foreground text-background text-sm font-medium transition-transform hover:opacity-90 active:scale-95 flex items-center gap-2"
            >
              <span>Get Started</span>
            </a>
          </div>
        </div>

        {/* Copy Command */}
        <div
          className="flex flex-col items-center justify-center w-full gap-2 py-8 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: "0.5s", transform: "translateY(20px)" }}
        >
          <button
            onClick={handleCopy}
            className="group relative flex items-center justify-between gap-4 pl-6 pr-2 py-2 bg-gradient-to-b from-white/60 to-white/20 dark:from-white/10 dark:to-white/5 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.03)] rounded-full transition-all duration-500 overflow-hidden"
          >
            {/* Liquid shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            
            <span className="font-mono text-[13px] sm:text-sm tracking-wide text-neutral-700 dark:text-neutral-300 relative z-10 transition-colors duration-300">
              npx shadcn add https://intrface2026.github.io/vinyl-stack/registry/vinyl-stack.json
            </span>
            
            <div className="relative z-10 flex items-center justify-center p-2 rounded-full bg-black/5 dark:bg-white/10 shadow-inner">
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500 animate-in spin-in-90 zoom-in duration-300" />
              ) : (
                <Copy className="h-4 w-4 text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
              )}
            </div>
          </button>
        </div>

        {/* Toggle between CoverFlow and HelixFlow */}
        <div
          className="mt-8 mb-4 flex items-center justify-center p-1 rounded-full bg-secondary/30 border border-border/50 backdrop-blur-sm animate-fade-in opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: "0.6s", transform: "translateY(20px)" }}
        >
          <button
            onClick={() => setActiveFlow("cover")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeFlow === "cover"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Standard View
          </button>
          <button
            onClick={() => setActiveFlow("helix")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeFlow === "helix"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Helix Flow
          </button>
        </div>
      </div>

      {/* Flow Integration */}
      <div
        className="w-full mt-2 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
        style={{ animationDelay: "0.7s", transform: "translateY(20px)" }}
      >
        <div className="w-full relative">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-20">
            {activeFlow === "cover" ? <CoverFlow /> : <HelixFlow />}
            <div className="hidden sm:block text-center mt-8 text-sm font-semibold text-foreground tracking-wide opacity-50 hover:opacity-100 transition-opacity">
              Horizontal Scroll • Drag • Keyboard
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
