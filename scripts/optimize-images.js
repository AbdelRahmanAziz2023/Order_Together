const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  'assets/images/splash.png',
  'assets/images/Order-Together-Logo.png',
  'assets/images/icon.png',
  'assets/images/Order-Together-Logo-only.png',
  // iOS assets (safe to compress, preserve file names)
  'ios/OrderTogether/Images.xcassets/SplashScreenLegacy.imageset/image@3x.png',
  'ios/OrderTogether/Images.xcassets/SplashScreenLegacy.imageset/image@2x.png',
  'ios/OrderTogether/Images.xcassets/SplashScreenLegacy.imageset/image.png'
];

(async () => {
  for (const img of images) {
    if (!fs.existsSync(img)) continue;
    const ext = path.extname(img).toLowerCase();
    const base = img.replace(ext, '');
    try {
      console.log('Optimizing', img);
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        // Overwrite original with compressed PNG
        await sharp(img).png({ quality: 85, compressionLevel: 9 }).toFile(base + '.opt.png');
        fs.renameSync(base + '.opt.png', img);
        // Create webp copy for Android
        await sharp(img).webp({ quality: 86 }).toFile(base + '.webp');
      } else if (ext === '.svg') {
        // skip svg
        console.log('Skipping svg', img);
      }
    } catch (e) {
      console.error('Failed to optimize', img, e);
    }
  }
  console.log('Done optimizing images.');
})();