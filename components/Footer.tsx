import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-10 bg-background">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/80">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-foreground/20" />
          <span className="font-medium text-foreground/80">CoverFlow</span>
        </div>

        <div className="flex items-center gap-6 font-medium">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Prathamesh Naidu
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Source Code
          </a>
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Vercel
          </a>
        </div>

        <a
          href="https://intrface.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] opacity-50 uppercase tracking-widest hover:opacity-100 transition-opacity"
        >
          {new Date().getFullYear()} intrface
        </a>
      </div>
    </footer>
  );
};
