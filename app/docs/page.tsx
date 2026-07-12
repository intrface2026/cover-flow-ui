import { MainWrapper } from "@/components/MainWrapper";
import { Check, Copy } from "lucide-react";
import { CoverFlow } from "@/components/CoverFlow";

export const metadata = {
  title: "Docs — Install the React Coverflow Component",
  description: "Install Cover Flow for React via the shadcn CLI, npm, pnpm, yarn, or bun.",
};

export default function DocsPage() {
  return (
    <MainWrapper>
      <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Get Started</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Install the component via CLI or copy the source code directly into your project.
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Installation</h2>
          <div className="space-y-6">
            <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-secondary/50">
                <span className="text-sm font-medium">Shadcn CLI</span>
              </div>
              <div className="p-4 bg-black/5 dark:bg-white/5 font-mono text-sm text-foreground overflow-x-auto">
                <span className="text-blue-500">pnpm</span> dlx <span className="text-teal-500">shadcn@latest</span> add <span className="text-muted-foreground">https://raw.githubusercontent.com/intrface2026/cover-flow-ui/main/public/registry/cover-flow.json</span>
              </div>
            </div>

            <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-secondary/50">
                <span className="text-sm font-medium">Manual Installation</span>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">1. Install dependencies:</p>
                  <div className="p-3 bg-black/5 dark:bg-white/5 rounded-md font-mono text-sm">
                    npm install framer-motion lucide-react
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-3">2. Copy the component code into <code className="bg-secondary px-1.5 py-0.5 rounded">components/ui/cover-flow.tsx</code></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Usage</h2>
          <div className="rounded-xl border border-border/40 bg-card overflow-hidden mb-6">
            <div className="h-[400px] w-full border-b border-border/40 bg-background relative overflow-hidden">
               <CoverFlow />
            </div>
            <div className="p-6 bg-secondary/10 overflow-x-auto">
              <pre className="text-sm font-mono text-muted-foreground">
{`import { CoverFlow } from "@/components/ui/coverflow";

export default function CoverFlowDemo() {
  return (
    <div className="h-[400px] w-full relative">
      <CoverFlow />
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </MainWrapper>
  );
}
