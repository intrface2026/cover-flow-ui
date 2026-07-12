const fs = require('fs');
const path = require('path');

const REGISTRY_URL = "https://your-github-username.github.io/your-repo/registry"; // Placeholder

const components = [
  {
    name: "cover-flow",
    type: "registry:ui",
    dependencies: ["framer-motion", "lucide-react"],
    files: [
      {
        path: "components/ui/cover-flow.tsx",
        source: "components/CoverFlow.tsx"
      },
      {
        path: "components/ui/helix-flow.tsx",
        source: "components/HelixFlow.tsx"
      }
    ]
  }
];

const registryDir = path.join(__dirname, '../public/registry');
if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir, { recursive: true });
}

components.forEach(component => {
  const fileParams = component.files.map(file => {
    const content = fs.readFileSync(path.join(__dirname, '../', file.source), 'utf8');
    // Basic adjustments to imports if necessary, e.g., adjusting relative imports
    // For now, we assume the user will place them in the same directory
    // We might need to adjust imports in CoverFlow.tsx to point to ./helix-flow instead of ./HelixFlow
    // if we rename the file.
    
    let processedContent = content;
    if (file.source === "components/CoverFlow.tsx") {
        processedContent = processedContent.replace('import { HelixFlow } from "./HelixFlow"', 'import { HelixFlow } from "./helix-flow"');
    }

    return {
      path: file.path,
      content: processedContent,
      type: "registry:ui",
      target: ""
    };
  });

  const payload = {
    name: component.name,
    type: component.type,
    dependencies: component.dependencies,
    files: fileParams
  };

  fs.writeFileSync(
    path.join(registryDir, `${component.name}.json`),
    JSON.stringify(payload, null, 2)
  );
  
  console.log(`Generated registry/${component.name}.json`);
});
