"use client";

import React, { useState } from "react";
import { Copy, Check, ChevronRight } from "lucide-react";
import { CoverFlow } from "./CoverFlow";
import { HelixFlow } from "./HelixFlow"; // Assuming HelixFlow is exported similarly

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeFlow, setActiveFlow] = useState<"cover" | "helix">("cover");

  const handleCopy = () => {
    navigator.clipboard.writeText("npx shadcn add https://intrface2026.github.io/cover-flow-ui/registry/cover-flow.json");
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
            iOS-like Cover Flow for React.
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
              <span className="font-semibold transition-all duration-200 group-hover:text-sky-700 dark:group-hover:text-sky-400">
                Motion
              </span>{" "}
              and{" "}
              <span className="font-semibold transition-all duration-200 group-hover:text-sky-700 dark:group-hover:text-sky-400">
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
          className="flex flex-col items-center border-y w-full border-dashed gap-2 py-4 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: "0.5s", transform: "translateY(20px)" }}
        >
          <button
            onClick={handleCopy}
            className="flex gap-2 flex-row font-mono text-xs cursor-copy text-muted-foreground hover:text-foreground transition-colors items-center"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            npx shadcn add https://intrface2026.github.io/cover-flow-ui/registry/cover-flow.json
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
            Cover Flow
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
        <div className="w-full border-dashed border-border/70 relative">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-20">
            {activeFlow === "cover" ? <CoverFlow /> : <HelixFlow onBack={() => setActiveFlow("cover")} />}
            <div className="hidden sm:block text-center mt-8 text-sm font-semibold text-foreground tracking-wide opacity-50 hover:opacity-100 transition-opacity">
              Horizontal Scroll • Drag • Keyboard
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
