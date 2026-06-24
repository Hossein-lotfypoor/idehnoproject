import fs from 'fs';
import path from 'path';

const sourceDir = './build/client';
const targetDir = './dist';
const publicDir = './public';

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy files recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy build/client to dist
copyDir(sourceDir, targetDir);

// Copy 404.html from public to dist
const source404 = path.join(publicDir, '404.html');
const target404 = path.join(targetDir, '404.html');
if (fs.existsSync(source404)) {
  fs.copyFileSync(source404, target404);
  console.log('404.html copied to dist/');
}

console.log('Build files copied to dist/ folder for GitHub Pages');
