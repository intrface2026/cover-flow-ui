import React from "react";
import { Star, Heart } from "lucide-react";

export const Sponsor: React.FC = () => {
  return (
    <section
      id="sponsor"
      className="relative py-24 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm"
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <div className="inline-flex justify-center items-center p-3 mb-6 bg-red-500/10 rounded-full">
          <Heart className="h-5 w-5 text-red-500 fill-current animate-pulse" />
        </div>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Open Source & Free
        </h2>
        <p className="mb-8 text-base leading-relaxed text-muted-foreground max-w-lg mx-auto">
          Built for the community. If you use this in your commercial projects,
          consider supporting the development.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/intrface2026"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:scale-105 hover:opacity-90"
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>Sponsor on GitHub</span>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://intrface.in"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-6 text-sm font-medium text-foreground transition-all hover:scale-105 hover:bg-black/10 dark:hover:bg-white/10"
          >
            <span>Contact Intrface</span>
          </a>
        </div>
        <p className="mt-6 text-sm text-muted-foreground/60">
          For more such creative solutions, contact us at{" "}
          <a
            href="https://intrface.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            intrface.in
          </a>
        </p>
      </div>
    </section>
  );
};
