import React from "react";
import {
  Zap,
  Command,
  Layers,
  Smartphone,
  Moon,
  Volume2,
  Scaling,
  FlipVertical2,
} from "lucide-react";

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 relative border-t border-dashed border-border">
      {/* Decorative Plus Icons for the corners (simulating the reference layout) */}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus absolute -bottom-3 -left-3 text-muted-foreground/30"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus absolute -bottom-3 -right-3 text-muted-foreground/30"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
      
      <div className="px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Zero Layout Shift */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-secondary/20 border border-border/50 p-6 min-h-[180px] md:min-h-[220px] group transition-colors hover:bg-secondary/40">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <Layers className="h-24 w-24 md:h-32 md:w-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-end">
              <h3 className="text-lg font-semibold mb-2 tracking-tight text-foreground">Zero Layout Shift</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground font-medium tracking-wide opacity-90">
                Isolated transforms ensure the surrounding layout never jumps.
              </p>
            </div>
          </div>

          {/* Card 2: Touch Ready */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-secondary/20 border border-border/50 p-6 min-h-[180px] md:min-h-[220px] group transition-colors hover:bg-secondary/40">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <Smartphone className="h-24 w-24 md:h-32 md:w-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-end">
              <h3 className="text-lg font-semibold mb-2 tracking-tight text-foreground">Touch Ready</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground font-medium tracking-wide opacity-90">
                1:1 gesture tracking with velocity-aware throwing.
              </p>
            </div>
          </div>

          {/* Card 3: Dark Mode Native */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-secondary/20 border border-border/50 p-6 min-h-[180px] md:min-h-[220px] group transition-colors hover:bg-secondary/40">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <Moon className="h-24 w-24 md:h-32 md:w-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-end">
              <h3 className="text-lg font-semibold mb-2 tracking-tight text-foreground">Dark Mode Native</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground font-medium tracking-wide opacity-90">
                Optimized for deep blacks and vibrant highlights.
              </p>
            </div>
          </div>

          {/* Card 4: Fluid Physics Engine (Wide) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-secondary/20 border border-border/50 p-8 md:p-10 min-h-[280px] md:min-h-[320px] md:col-span-2 group transition-colors hover:bg-secondary/40">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <Zap className="h-[200px] w-[200px] md:h-[400px] md:w-[400px]" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-end">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-foreground">Fluid Physics Engine</h3>
              <p className="text-base md:text-[17px] leading-relaxed text-muted-foreground font-medium max-w-[40ch]">
                Driven by real-time spring physics, not linear timelines. The motion feels weighty, responsive, and interruptible at any frame.
              </p>
            </div>
          </div>

          {/* Card 5: Keyboard First (Tall) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-secondary/20 border border-border/50 p-8 min-h-[280px] md:min-h-[320px] group transition-colors hover:bg-secondary/40 md:col-span-1 md:row-span-2">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <Command className="h-40 w-40" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-foreground">Keyboard First</h3>
              <p className="text-base leading-relaxed text-muted-foreground font-medium">
                Fully accessible with arrow key navigation and focus management.
              </p>
            </div>
            <div className="relative z-10 flex justify-center gap-3 mt-6 opacity-80">
              <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl border border-border bg-background/50 font-mono text-base shadow-sm">←</div>
              <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl border border-border bg-background/50 font-mono text-base shadow-sm">→</div>
            </div>
          </div>

          {/* Card 6: Signature Reflections */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-secondary/20 border border-border/50 p-6 min-h-[180px] md:min-h-[220px] group transition-colors hover:bg-secondary/40">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <FlipVertical2 className="h-24 w-24 md:h-32 md:w-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-end">
              <h3 className="text-lg font-semibold mb-2 tracking-tight text-foreground">Signature Reflections</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground font-medium tracking-wide opacity-90">
                The iconic mirrored-floor effect, one prop away. Tuned per browser for smooth performance.
              </p>
            </div>
          </div>

          {/* Card 7: Spatial Audio */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-secondary/20 border border-border/50 p-6 min-h-[180px] md:min-h-[220px] group transition-colors hover:bg-secondary/40">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <Volume2 className="h-24 w-24 md:h-32 md:w-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-end">
              <h3 className="text-lg font-semibold mb-2 tracking-tight text-foreground">Spatial Audio</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground font-medium tracking-wide opacity-90">
                Velocity-aware ticks pan across the stereo field as covers pass. Synthesized live — no sound files.
              </p>
            </div>
          </div>

          {/* Card 8: Auto-Responsive */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-secondary/20 border border-border/50 p-6 min-h-[180px] md:min-h-[220px] group transition-colors hover:bg-secondary/40">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <Scaling className="h-24 w-24 md:h-32 md:w-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-end">
              <h3 className="text-lg font-semibold mb-2 tracking-tight text-foreground">Auto-Responsive</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground font-medium tracking-wide opacity-90">
                Measures its container and scales covers, spacing, and gaps to fit. No breakpoints required.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
