import React from "react";
import { Sparkles } from "lucide-react";

export const Sponsor: React.FC = () => {
  return (
    <section
      id="more-components"
      className="relative py-24 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm"
    >
      <div className="mx-auto max-w-2xl px-6 text-center flex flex-col items-center">
        <div className="inline-flex justify-center items-center p-3 mb-6 bg-indigo-500/10 rounded-full">
          <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
        </div>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          More Creative UI Components
        </h2>
        <p className="mb-8 text-base leading-relaxed text-muted-foreground max-w-md mx-auto">
          For more such creative and interactive UI components, visit our labs at Intrface.
        </p>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://intrface.in/labs"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:scale-[1.02] hover:opacity-90 shadow-sm"
        >
          Explore Intrface Labs
        </a>
      </div>
    </section>
  );
};
