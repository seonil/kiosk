/**
 * Script to fetch Figma design data
 * Run with: node scripts/fetchFigmaDesign.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const FIGMA_TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN || process.env.FIGMA_TOKEN;
const FIGMA_URL = process.env.FIGMA_FILE_URL || 'https://www.figma.com/design/a4HeaeWKeacfWEJhm1bt2B/CES2026-Branding?node-id=3892-1290&m=dev';

if (!FIGMA_TOKEN) {
  console.error('❌ FIGMA_PERSONAL_ACCESS_TOKEN (or FIGMA_TOKEN) is not set in the environment.');
  process.exit(1);
}

// Parse Figma URL
function parseFigmaUrl(url) {
  const fileKeyMatch = url.match(/figma\.com\/design\/([^/?]+)/);
  const nodeIdMatch = url.match(/node-id=([^&]+)/);

  if (!fileKeyMatch) {
    throw new Error('Invalid Figma URL');
  }

  return {
    fileKey: fileKeyMatch[1],
    nodeId: nodeIdMatch ? nodeIdMatch[1].replace(/-/g, ':') : null
  };
}

async function fetchFigmaFile(fileKey, nodeId) {
  const url = nodeId
    ? `${FIGMA_API_BASE}/files/${fileKey}?ids=${nodeId}`
    : `${FIGMA_API_BASE}/files/${fileKey}`;

  console.log(`Fetching: ${url}`);

  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  try {
    console.log('Parsing Figma URL...');
    const { fileKey, nodeId } = parseFigmaUrl(FIGMA_URL);
    console.log(`File Key: ${fileKey}`);
    console.log(`Node ID: ${nodeId}`);

    console.log('\nFetching Figma design data...');
    const data = await fetchFigmaFile(fileKey, nodeId);

    // Save to file
    const outputDir = path.join(__dirname, '..', 'figma-data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const suffix = nodeId ? nodeId.replace(/:/g, '-') : 'full-file';
    const outputFile = path.join(outputDir, `design-${suffix}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));

    console.log(`\n✅ Design data saved to: ${outputFile}`);
    console.log(`\nDocument name: ${data.name || 'N/A'}`);
    console.log(`Last modified: ${data.lastModified || 'N/A'}`);

    // Print basic structure
    if (data.document) {
      console.log('\n📋 Document Structure:');
      const printNode = (node, indent = 0) => {
        const prefix = '  '.repeat(indent);
        console.log(`${prefix}- ${node.name} (${node.type})`);
        if (node.children && indent < 3) {
          node.children.forEach(child => printNode(child, indent + 1));
        }
      };
      printNode(data.document);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
