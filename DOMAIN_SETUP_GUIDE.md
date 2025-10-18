# SoulCards 自定義域名設置指南

## 🌐 概述
本指南將幫助您為 SoulCards 網站設置自定義域名 `soulcards-app.com`，通過 Vercel 進行托管。

## 📋 前提條件
- 已經擁有域名 `soulcards-app.com`
- 網站已成功部署到 Vercel
- 可以訪問域名註冊商的 DNS 管理面板

---

## 🚀 步驟 1: 在 Vercel 中添加自定義域名

### 1.1 登錄 Vercel 控制台
1. 訪問 [vercel.com](https://vercel.com)
2. 登錄您的賬戶
3. 選擇您的 SoulCards 項目

### 1.2 添加自定義域名
1. 進入項目設置頁面
2. 點擊左側菜單的 "Domains"
3. 點擊 "Add Domain" 按鈕
4. 輸入：`soulcards-app.com`
5. 點擊 "Add" 確認添加

---

## 🔧 步驟 2: DNS 配置

### 2.1 獲取 Vercel DNS 信息
添加域名後，Vercel 會提供以下信息：
- **A 記錄**: `76.76.19.61`
- **CNAME 記錄**: `cname.vercel-dns.com`

### 2.2 配置 DNS 記錄

#### 選項 A: 使用 A 記錄（推薦）
在您的域名註冊商處添加以下 DNS 記錄：

| 類型 | 主機名 | 值 | TTL |
|------|--------|-----|-----|
| A | @ | 76.76.19.61 | 3600 |
| A | www | 76.76.19.61 | 3600 |

#### 選項 B: 使用 CNAME 記錄
如果您更喜歡使用 CNAME：

| 類型 | 主機名 | 值 | TTL |
|------|--------|-----|-----|
| CNAME | www | cname.vercel-dns.com | 3600 |

**注意**: 根域名 (@) 不能直接使用 CNAME，需要使用 A 記錄。

---

## 🔒 步驟 3: SSL 證書配置

### 3.1 自動 SSL
Vercel 會自動為您的自定義域名提供 SSL 證書：
- 證書類型：Let's Encrypt SSL
- 自動續期：是
- 配置時間：通常 1-2 分鐘

### 3.2 驗證 SSL 狀態
1. 在 Vercel 控制台查看域名狀態
2. 狀態應顯示為 "Active"
3. 訪問 `https://soulcards-app.com` 測試

---

## 📱 步驟 4: 高級配置（可選）

### 4.1 重定向設置
創建 `vercel.json` 文件來處理重定向：

```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

### 4.2 自定義標頭
添加安全標頭和性能優化：

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## 📝 常見 DNS 註冊商配置指南

### Cloudflare
1. 登錄 Cloudflare 賬戶
2. 選擇您的域名
3. 進入 "DNS" 標籤
4. 添加 A 記錄：
   - 名稱: `@`
   - IPv4 地址: `76.76.19.61`
   - 代理狀態: 可選（DNS only 或 Proxied）

### GoDaddy
1. 登錄 GoDaddy 賬戶
2. 進入 "我的產品" → "DNS"
3. 找到您的域名，點擊 "管理"
4. 添加 A 記錄指向 `76.76.19.61`

### Namecheap
1. 登錄 Namecheap 賬戶
2. 進入 "Domain List"
3. 點擊 "Manage" → "Advanced DNS"
4. 添加 A 記錄

---

## ⚡ 步驟 5: 驗證和測試

### 5.1 DNS 傳播檢查
使用以下工具檢查 DNS 是否生效：
- [whatsmydns.net](https://whatsmydns.net)
- [dnschecker.org](https://dnschecker.org)

輸入您的域名 `soulcards-app.com`，檢查 A 記錄是否指向 `76.76.19.61`。

### 5.2 功能測試
1. 訪問 `https://soulcards-app.com`
2. 檢查 SSL 證書是否有效
3. 測試所有頁面是否正常加載
4. 確認手機端響應式設計

---

## 🔧 故障排除

### 常見問題 1: DNS 未生效
**症狀**: 域名無法訪問
**解決方案**:
- 等待 DNS 傳播（最多 48 小時）
- 檢查 DNS 記錄是否正確
- 清除本地 DNS 緩存

### 常見問題 2: SSL 證書錯誤
**症狀**: 瀏覽器顯示安全警告
**解決方案**:
- 確保使用 `https://` 訪問
- 等待 SSL 證書自動配置（1-2 分鐘）
- 檢查 Vercel 控制台中的域名狀態

### 常見問題 3: 重定向循環
**症狀**: 頁面不斷重定向
**解決方案**:
- 檢查 vercel.json 中的重定向配置
- 確保沒有循環重定向規則

---

## 📊 性能優化建議

### 啟用 CDN
Vercel 自動提供全球 CDN，確保：
- 靜態資源緩存設置正確
- 圖片優化和壓縮

### 監控設置
設置網站監控：
- Google Analytics
- Vercel Analytics
- 正常運行時間監控

---

## ✅ 檢查清單

設置完成後，請確認：
- [ ] 域名可以正常訪問
- [ ] SSL 證書有效
- [ ] 手機端響應正常
- [ ] 所有頁面加載正確
- [ ] App Store 鏈接正常工作
- [ ] SEO 元標籤正確

---

## 🆘 獲取幫助

如果遇到問題：
1. 檢查 Vercel 文檔：[vercel.com/docs](https://vercel.com/docs)
2. 查看 DNS 傳播狀態
3. 聯繫您的域名註冊商支持
4. 在 Vercel 社區尋求幫助

---

**恭喜！🎉 您的 SoulCards 網站現在應該可以通過 `https://soulcards-app.com` 訪問了！**