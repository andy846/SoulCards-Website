# 📝 SoulCards DNS 配置檢查清單

## 域名: soulcards-app.com

### ✅ Vercel 設置
- [ ] 登錄 Vercel 控制台
- [ ] 進入 SoulCards 項目
- [ ] 點擊 Settings → Domains
- [ ] 添加域名: `soulcards-app.com`
- [ ] 記錄提供的 IP 地址: `76.76.19.61`

### ✅ DNS 記錄配置
在域名註冊商處添加以下記錄：

#### A 記錄（必需）
- [ ] 類型: A
- [ ] 主機名: @ (根域名)
- [ ] 值: 76.76.19.61
- [ ] TTL: 3600

#### WWW 重定向（推薦）
- [ ] 類型: A  
- [ ] 主機名: www
- [ ] 值: 76.76.19.61
- [ ] TTL: 3600

### ✅ 驗證設置
- [ ] DNS 傳播檢查: [whatsmydns.net](https://whatsmydns.net)
- [ ] 訪問測試: `https://soulcards-app.com`
- [ ] SSL 證書檢查（綠色鎖圖標）
- [ ] 手機端測試

### ✅ 常見問題排查
如果出現問題：
- [ ] 等待 DNS 傳播（最多48小時）
- [ ] 清除瀏覽器緩存
- [ ] 檢查 DNS 記錄是否正確
- [ ] 確認 Vercel 中域名狀態為 "Active"

---

**🎯 完成所有檢查後，您的網站將可通過 `https://soulcards-app.com` 訪問！**