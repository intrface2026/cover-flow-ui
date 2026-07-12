# Cover Flow & Helix Animation

A stunning, Apple-style Cover Flow component with a unique Helix mode, built with **React**, **Framer Motion**, and **Tailwind CSS**.

![Cover Flow Demo](/demo-cover-flow.png)

## Features

- **Classic Cover Flow**: Smooth 3D carousel with reflections and snap-to-center.
- **Helix Mode**: A mesmerizing spiral view of your albums or items.
- **Keyboard Navigation**: Arrow key support for easy browsing.
- **Responsive**: Adapts beautifully to desktop and mobile screens.
- **Dynamic Content**: Fetches real album art from iTunes API (or replace with your own).

## Installation

You can install this component via CLI (experimental) or by manually copying the source code.

### Option 1: CLI (Experimental)

If you are using `shadcn/ui`, you can try adding it directly (requires the registry URL):

```bash
npx shadcn@latest add https://raw.githubusercontent.com/intrface2026/cover-flow-ui/main/public/registry/cover-flow.json
```

### Option 2: Manual Installation

1. **Install Dependencies**

   Ensure you have the necessary dependencies installed:

   ```bash
   npm install framer-motion lucide-react
   # or
   pnpm add framer-motion lucide-react
   # or
   yarn add framer-motion lucide-react
   ```

2. **Copy Component Files**

   Create two files in your `components` directory (or `components/ui`):
   - `CoverFlow.tsx`
   - `HelixFlow.tsx`

   Copy the source code from the repository into these files.

3. **Update Imports**

   Ensure `CoverFlow.tsx` correctly imports `HelixFlow`.

   ```tsx
   // In CoverFlow.tsx
   import { HelixFlow } from "./HelixFlow"; // Adjust path as needed
   ```

## Usage

Import and use the `CoverFlow` component in your page or layout:

```tsx
import { CoverFlow } from "@/components/CoverFlow";

export default function Page() {
  return (
    <main className="h-screen w-full bg-black flex items-center justify-center">
      <CoverFlow />
    </main>
  );
}
```

## Customization

The component accepts optional props for customization, though it works great out of the box.

| Prop               | Type              | Default | Description                                                  |
| :----------------- | :---------------- | :------ | :----------------------------------------------------------- |
| `items`            | `CoverFlowItem[]` | `[]`    | Array of items to display. If empty, it fetches from iTunes. |
| `initialIndex`     | `number`          | `0`     | Index of the item to start on.                               |
| `enableReflection` | `boolean`         | `true`  | Whether to show the reflection effect.                       |

_(See code comments for more advanced engine props like `itemWidth`, `rotation`, etc.)_
