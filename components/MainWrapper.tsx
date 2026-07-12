"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Sponsor } from "./Sponsor";
import { FAQ } from "./FAQ";
import { Footer } from "./Footer";

export function MainWrapper({ children }: { children?: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme from local storage or system preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (saved === "dark" || (!saved && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode, mounted]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Prevent hydration mismatch by not rendering theme-dependent UI until mounted
  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="relative flex min-h-screen flex-col font-sans">
      {/* Global Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* (Ambient Light Removed for Pure Black Aesthetic) */}

      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      <main className="relative z-10 flex-1 w-full">
        {children || (
          <>
            <Hero />
            <Features />
            <Sponsor />
            <FAQ />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
