/**
 * This script updates all image paths in the resto.ts file
 * by removing '/public' prefix from the paths.
 */

import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the resto.ts file
const restoFilePath = join(__dirname, '..', 'src', 'mixins', 'resto.ts');

async function updateImagePaths() {
  try {
    // Read the file content
    const data = await readFile(restoFilePath, 'utf8');
    
    // Replace all occurrences of '/public/images/' with '/images/'
    const updatedContent = data.replace(/['"]\/public\/images\//g, '"/images/');
    
    // Write the updated content back to the file
    await writeFile(restoFilePath, updatedContent, 'utf8');
  } catch (err) {
    console.error('Error:', err);
  }
}

updateImagePaths();