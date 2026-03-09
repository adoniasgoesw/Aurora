import { createWriteStream, existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..', '..', '..');
const distDir = join(rootDir, 'Aurora Pro', 'dist');
const outputPath = join(__dirname, '..', 'public', 'aurora-pro.zip');

if (!existsSync(distDir)) {
  console.warn('⚠ Aurora Pro/dist not found — skipping zip (site will build without aurora-pro.zip).');
  process.exit(0);
}

async function zipDirectory(sourceDir, outPath) {
  const output = createWriteStream(outPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => resolve());
    archive.on('error', reject);

    archive.pipe(output);

    const addDir = async (dir, basePath = '') => {
      const entries = await readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        const relPath = join(basePath, entry.name);
        if (entry.isDirectory()) {
          await addDir(fullPath, relPath);
        } else {
          archive.file(fullPath, { name: relPath });
        }
      }
    };

    addDir(distDir).then(() => {
      archive.finalize();
    }).catch(reject);
  });
}

zipDirectory(distDir, outputPath)
  .then(() => console.log('✓ aurora-pro.zip created in public/'))
  .catch((err) => {
    console.error('Failed to create zip:', err);
    process.exit(1);
  });
