/* eslint-disable @typescript-eslint/no-require-imports */
// Generate favicon from SVG
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createFavicon() {
  try {
    const svgPath = path.join(__dirname, '../public/pokeball.svg');
    const outputPath = path.join(__dirname, '../src/app/favicon.ico');
    
    const svgBuffer = fs.readFileSync(svgPath);

    const sizes = [16, 32, 48];
    const images = await Promise.all(
      sizes.map(size => 
        sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    await sharp(images[1]) 
      .toFormat('ico')
      .toFile(outputPath);

    console.log(`✅ Favicon created successfully at: ${outputPath}`);
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
