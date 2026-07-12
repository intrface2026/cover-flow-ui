# VinylStack

An open-source, iOS-style vinylstack component for React. It features real spring physics (via Motion), Tailwind CSS styling, drag/touch/wheel interactions, and dark mode support.

## Installation

### Via Shadcn CLI (Recommended)

You can install this component directly using the Shadcn CLI:

```bash
pnpm dlx shadcn@latest add https://intrface2026.github.io/vinyl-stack/registry/vinyl-stack.json
```

### Manual Installation

1. Install the dependencies:
```bash
npm install framer-motion lucide-react
```

2. Copy the component files from `components/CoverFlow.tsx` and `components/HelixFlow.tsx` into your project.

## Usage

```tsx
import { CoverFlow } from "@/components/ui/coverflow"

export default function App() {
  const items = [
    { id: 1, image: "/album1.jpg", title: "Album 1" },
    { id: 2, image: "/album2.jpg", title: "Album 2" },
  ]

  return (
    <div className="w-full h-[600px]">
      <CoverFlow items={items} />
    </div>
  )
}
```

## License

MIT
