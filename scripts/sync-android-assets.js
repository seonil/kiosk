// Copy dist output into the Android WebView assets folder.
// Usage: npm run android:sync
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const targetDir = path.join(projectRoot, 'android-app', 'app', 'src', 'main', 'assets', 'www');

if (!fs.existsSync(distDir)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

// Clean target
for (const entry of fs.readdirSync(targetDir)) {
  fs.rmSync(path.join(targetDir, entry), { recursive: true, force: true });
}

// Copy dist recursively
const copyRecursive = (src, dest) => {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
};

copyRecursive(distDir, targetDir);
console.log(`✅ Copied dist -> ${path.relative(projectRoot, targetDir)}`);
