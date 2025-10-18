const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 定義需要的圖標尺寸
const iconSizes = [
  { size: 1024, name: 'icon-1024.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 256, name: 'icon-256.png' },
  { size: 180, name: 'icon-180.png' },
  { size: 167, name: 'icon-167.png' },
  { size: 152, name: 'icon-152.png' },
  { size: 120, name: 'icon-120.png' },
  { size: 87, name: 'icon-87.png' },
  { size: 80, name: 'icon-80.png' },
  { size: 76, name: 'icon-76.png' },
  { size: 60, name: 'icon-60.png' },
  { size: 58, name: 'icon-58.png' },
  { size: 40, name: 'icon-40.png' },
  { size: 29, name: 'icon-29.png' },
  { size: 20, name: 'icon-20.png' }
];

const svgPath = './SoulCards/Assets.xcassets/AppIcon.appiconset/app-icon.svg';
const outputDir = './SoulCards/Assets.xcassets/AppIcon.appiconset/';

async function generateIcons() {
  try {
    console.log('開始生成應用圖標...');
    
    // 確保輸出目錄存在
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 讀取 SVG 文件
    const svgBuffer = fs.readFileSync(svgPath);
    
    // 為每個尺寸生成 PNG
    for (const { size, name } of iconSizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png({
          quality: 100,
          compressionLevel: 0
        })
        .toFile(outputPath);
      
      console.log(`✓ 生成 ${name} (${size}x${size})`);
    }
    
    console.log('\n所有圖標生成完成！');
    
  } catch (error) {
    console.error('生成圖標時發生錯誤:', error);
    process.exit(1);
  }
}

generateIcons();
