import fs from 'fs/promises';
import path from 'path';

const REGISTRY_DIR = path.join(process.cwd(), 'public', 'registry');
const COMPONENT_DIR = path.join(process.cwd(), 'components');

async function buildRegistry() {
  try {
    console.log('Building CoverFlow registry...');
    
    // Ensure registry directory exists
    await fs.mkdir(REGISTRY_DIR, { recursive: true });

    // Read component files
    const coverFlowPath = path.join(COMPONENT_DIR, 'CoverFlow.tsx');
    const helixFlowPath = path.join(COMPONENT_DIR, 'HelixFlow.tsx');
    
    const coverFlowContent = await fs.readFile(coverFlowPath, 'utf8');
    const helixFlowContent = await fs.readFile(helixFlowPath, 'utf8');

    // Create registry object
    const registry = {
      name: 'cover-flow',
      type: 'registry:ui',
      dependencies: ['framer-motion', 'lucide-react'],
      files: [
        {
          path: 'components/ui/cover-flow.tsx',
          content: coverFlowContent,
          type: 'registry:ui',
          target: ''
        },
        {
          path: 'components/ui/helix-flow.tsx',
          content: helixFlowContent,
          type: 'registry:ui',
          target: ''
        }
      ]
    };

    // Write registry JSON
    const registryFile = path.join(REGISTRY_DIR, 'cover-flow.json');
    await fs.writeFile(registryFile, JSON.stringify(registry, null, 2), 'utf8');
    
    console.log(`Successfully built registry at: ${registryFile}`);
  } catch (error) {
    console.error('Failed to build registry:', error);
    process.exit(1);
  }
}

buildRegistry();
