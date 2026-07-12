import React from "react";
import { Plus } from "lucide-react";

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-16 relative border-t border-dashed border-border/70 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-center text-foreground">
          Frequently asked questions
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-10 text-center text-balance">
          Everything about using the Cover Flow coverflow component in your React project.
        </p>

        <div className="border-y border-dashed border-border/70 divide-y divide-dashed divide-border/70">
          
          <details className="faq-item group">
            <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none text-base font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 [&::-webkit-details-marker]:hidden">
              What is Cover Flow?
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-open:rotate-45" />
            </summary>
            <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted-foreground">
              Cover Flow is the iconic 3D carousel interaction Apple introduced in iTunes and iOS, where album covers fan out in 3D space and snap to center as you browse. This project is an open-source recreation of that coverflow effect as a React component, rebuilt with real spring physics instead of scripted animations.
            </p>
          </details>

          <details className="faq-item group">
            <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none text-base font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 [&::-webkit-details-marker]:hidden">
              How do I add a coverflow carousel to a React app?
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-open:rotate-45" />
            </summary>
            <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted-foreground">
              Install the VinylStack component with the shadcn CLI — npx shadcn add https://intrface2026.github.io/vinyl-stack/registry/vinyl-stack.json — or from npm as @intrface2026/vinyl-stack. Then render the CoverFlow component with your items. It works in any modern React or Next.js App Router project.
            </p>
          </details>

          <details className="faq-item group">
            <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none text-base font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 [&::-webkit-details-marker]:hidden">
              Does it work with Next.js, Tailwind CSS, and shadcn/ui?
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-open:rotate-45" />
            </summary>
            <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted-foreground">
              Yes. The component is written in TypeScript, styled with Tailwind CSS, follows shadcn/ui conventions, and supports dark mode via next-themes. Isolated 3D transforms mean the surrounding layout never shifts.
            </p>
          </details>

          <details className="faq-item group">
            <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none text-base font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 [&::-webkit-details-marker]:hidden">
              Is the coverflow component accessible?
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-open:rotate-45" />
            </summary>
            <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted-foreground">
              Yes. It supports arrow-key navigation, focus management, and reduced-motion preferences, alongside drag, touch, click-to-snap, and horizontal scroll-wheel input.
            </p>
          </details>

          <details className="faq-item group">
            <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none text-base font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 [&::-webkit-details-marker]:hidden">
              How is this different from Swiper's coverflow effect?
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-open:rotate-45" />
            </summary>
            <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted-foreground">
              Swiper's coverflow effect applies CSS transforms along a fixed timeline. This component drives every card with real-time, interruptible spring physics from Motion (Framer Motion), with velocity-aware throwing and 1:1 gesture tracking — so it feels like the original iOS Cover Flow rather than a slideshow transition.
            </p>
          </details>

          <details className="faq-item group">
            <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none text-base font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 [&::-webkit-details-marker]:hidden">
              Is it free to use?
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-open:rotate-45" />
            </summary>
            <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted-foreground">
              Yes. Cover Flow is MIT-licensed and open source on GitHub, free for personal and commercial projects.
            </p>
          </details>

        </div>
      </div>
    </section>
  );
};
