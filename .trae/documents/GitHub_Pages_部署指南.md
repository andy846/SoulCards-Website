# SoulCards 推廣網站 GitHub Pages 部署指南

## 1. 部署前準備

### 1.1 GitHub 倉庫設置

1. **創建 GitHub 倉庫**
   - 倉庫名稱：`SoulCards_Website`
   - 設置為 Public（GitHub Pages 免費版需要公開倉庫）
   - 初始化時不要添加 README、.gitignore 或 LICENSE

2. **本地倉庫初始化**
   ```bash
   cd /Volumes/SSD-Mac/SoulCards_Website
   git init
   git add .
   git commit -m "Initial commit: SoulCards website setup"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/SoulCards_Website.git
   git push -u origin main
   ```

### 1.2 GitHub Pages 設置

1. 進入 GitHub 倉庫設置頁面
2. 滾動到 "Pages" 部分
3. Source 選擇 "GitHub Actions"
4. 這將啟用 GitHub Actions 自動部署

## 2. 項目結構設置

### 2.1 必需的配置文件

確保項目根目錄包含以下文件：

```
SoulCards_Website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── public/
│   ├── index.html             # 主 HTML 文件
│   ├── icon-192.png           # PWA 圖標
│   └── assets/                # 靜態資源
├── src/
│   ├── components/            # React 組件
│   ├── pages/                 # 頁面組件
│   ├── data/                  # 靜態數據
│   └── utils/                 # 工具函數
├── package.json               # 項目依賴
├── vite.config.ts            # Vite 配置
├── tailwind.config.js        # Tailwind CSS 配置
└── tsconfig.json             # TypeScript 配置
```

### 2.2 package.json 配置

```json
{
  "name": "soulcards-website",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "framer-motion": "^10.0.0",
    "react-helmet-async": "^1.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@vitejs/plugin-react": "^3.1.0",
    "autoprefixer": "^10.4.13",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.2.6",
    "typescript": "^4.9.4",
    "vite": "^4.1.0",
    "vite-plugin-pwa": "^0.14.4",
    "gh-pages": "^5.0.0"
  }
}
```

## 3. 自動化部署配置

### 3.1 GitHub Actions 工作流程

創建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy SoulCards Website to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build website
      run: npm run build
      env:
        NODE_ENV: production
        
    - name: Setup Pages
      uses: actions/configure-pages@v4
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    
    steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

### 3.2 Vite 配置優化

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      },
      manifest: {
        name: 'SoulCards - 塔羅占卜',
        short_name: 'SoulCards',
        description: '優雅的iOS塔羅牌占卜應用推廣網站',
        theme_color: '#663399',
        background_color: '#0D0A1A',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/SoulCards_Website/',
        start_url: '/SoulCards_Website/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/SoulCards_Website/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
  }
})
```

## 4. 部署步驟

### 4.1 首次部署

1. **推送代碼到 GitHub**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment configuration"
   git push origin main
   ```

2. **檢查 GitHub Actions**
   - 進入 GitHub 倉庫的 "Actions" 標籤
   - 確認部署工作流程正在運行
   - 等待部署完成（通常需要 2-5 分鐘）

3. **訪問網站**
   - 部署完成後，網站將可在以下地址訪問：
   - `https://YOUR_USERNAME.github.io/SoulCards_Website/`

### 4.2 後續更新

每次推送到 `main` 分支時，GitHub Actions 會自動重新部署網站：

```bash
git add .
git commit -m "Update website content"
git push origin main
```

## 5. 故障排除

### 5.1 常見問題

1. **404 錯誤**
   - 確認 `vite.config.ts` 中的 `base` 設置正確
   - 檢查路由配置是否使用 Hash Router

2. **資源載入失敗**
   - 確認所有資源路徑使用相對路徑
   - 檢查 `public` 目錄中的文件是否正確

3. **部署失敗**
   - 檢查 GitHub Actions 日誌
   - 確認 `package.json` 中的依賴版本兼容

### 5.2 調試技巧

1. **本地測試**
   ```bash
   npm run build
   npm run preview
   ```

2. **檢查構建輸出**
   ```bash
   ls -la dist/
   ```

3. **驗證路由**
   - 在本地預覽中測試所有路由
   - 確認 Hash Router 正常工作

## 6. 性能優化建議

### 6.1 圖片優化

- 使用 WebP 格式的圖片
- 實施懶加載
- 提供多種尺寸的響應式圖片

### 6.2 代碼優化

- 啟用代碼分割
- 移除未使用的依賴
- 壓縮 CSS 和 JavaScript

### 6.3 SEO 優化

- 添加完整的 meta 標籤
- 實施 Open Graph 協議
- 生成 sitemap.xml

## 7. 監控和分析

### 7.1 Google Analytics

在 `public/index.html` 中添加 Google Analytics 代碼：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 7.2 性能監控

使用 GitHub Pages 內建的分析功能監控網站訪問情況和性能指標。

---

**部署完成後，您的 SoulCards 推廣網站將在 GitHub Pages 上運行，提供快速、安全、免費的託管服務！**