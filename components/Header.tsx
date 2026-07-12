import React, { useState, useEffect } from "react";
import { Sun, Moon, Github, Star } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme }) => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/intrface2026/vinyl-stack")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch((e) => console.error("Failed to fetch stars", e));
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <header className="pointer-events-auto flex items-center justify-between gap-6 rounded-full border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-sm px-5 py-2.5 animate-slide-down">
        <a
          className="flex items-center gap-2.5 font-bold text-foreground transition-opacity hover:opacity-80"
          href="/"
        >
          <div className="h-4 w-4 rounded-full bg-foreground shadow-sm" />
          <span className="text-sm tracking-tight font-semibold">
            VinylStack
          </span>
        </a>

        <div className="flex items-center gap-3 pl-2 border-black/5 dark:border-white/10">
          <a
            href="https://github.com/intrface2026/vinyl-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-2 py-1 mr-2 rounded-md text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50 border border-transparent hover:border-border/50"
          >
            <Github className="h-3.5 w-3.5" />
            {stars !== null && (
              <>
                <div className="w-px h-3 bg-border/80" />
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>{stars}</span>
              </>
            )}
          </a>

          <button
            onClick={toggleTheme}
            className="group flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Moon className="h-4 w-4 transition-transform group-hover:-rotate-12" />
            ) : (
              <Sun className="h-4 w-4 transition-transform group-hover:rotate-12" />
            )}
          </button>
        </div>
      </header>
    </div>
  );
};
