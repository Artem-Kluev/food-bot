/**
 * Скрипт для автоматичного оновлення шляхів до зображень у файлі resto.ts
 */

const fs = require('fs');
const path = require('path');

// Шлях до файлу resto.ts
const restoFilePath = path.join(__dirname, '..', 'src', 'mixins', 'resto.ts');

// Читаємо вміст файлу
let content = fs.readFileSync(restoFilePath, 'utf8');

// Регулярний вираз для пошуку шляхів до зображень
const imagePathRegex = /base: '(\/(?:public\/)?images\/resto\/[^']+)',\s+webP: '(\/(?:public\/)?images\/resto\/[^']+)'/g;

// Замінюємо шляхи на виклики функції getImageUrl
const updatedContent = content.replace(imagePathRegex, (match, basePath, webPPath) => {
  return `base: getImageUrl('${basePath}'),\n      webP: getImageUrl('${webPPath}')`;
});

// Записуємо оновлений вміст назад у файл
fs.writeFileSync(restoFilePath, updatedContent, 'utf8');

console.log('Шляхи до зображень успішно оновлено!');