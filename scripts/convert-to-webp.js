const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Проверка, является ли файл изображением
function isImage(file) {
  const supportedExtensions = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff'];
  return supportedExtensions.includes(path.extname(file).toLowerCase());
}

// Конвертация изображения в WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp()
      .toFile(outputPath);
    console.log(`Converted: ${inputPath} -> ${outputPath}`);
  } catch (err) {
    console.error(`Failed to convert ${inputPath}:`, err.message);
  }
}

// Рекурсивная функция для обработки директории и её поддиректорий
async function processDirectory(directory) {
  try {
    const entries = await fs.promises.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        // Рекурсивный вызов для вложенных папок
        await processDirectory(fullPath);
      } else if (entry.isFile() && isImage(fullPath)) {
        const outputPath = path.join(
          directory,
          path.basename(entry.name, path.extname(entry.name)) + '.webp'
        );
        await convertToWebP(fullPath, outputPath);
      }
    }
  } catch (err) {
    console.error(`Error processing directory ${directory}:`, err.message);
  }
}

// Укажите путь к директории, где находятся изображения
const rootDirectory = './public'; // Замените на нужный путь

// Запуск скрипта
processDirectory(rootDirectory).then(() => {
  console.log('Conversion completed.');
});
