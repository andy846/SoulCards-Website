# 🚀 SoulCards 自定義域名快速設置

## 步驟 1: 登錄 Vercel 添加域名
1. 訪問 [vercel.com](https://vercel.com) → 您的項目 → Settings → Domains
2. 點擊 "Add Domain" → 輸入: `soulcards-app.com` → 添加

## 步驟 2: DNS 配置
在您的域名註冊商處添加這些 DNS 記錄：

```
類型: A記錄
主機名: @ 
值: 76.76.19.61
TTL: 3600

類型: A記錄  
主機名: www
值: 76.76.19.61  
TTL: 3600
```

## 步驟 3: 等待生效
- DNS 傳播: 5分鐘 - 48小時
- SSL 證書: 自動配置（1-2分鐘）
- 測試訪問: `https://soulcards-app.com`

## 📱 常見域名註冊商設置

**Cloudflare**: DNS → 添加 A 記錄 → 值: `76.76.19.61`
**GoDaddy**: DNS 管理 → 添加 A 記錄 → 指向上述 IP
**Namecheap**: Advanced DNS → 添加 A 記錄

## ✅ 完成檢查
- [ ] `https://soulcards-app.com` 可以訪問
- [ ] SSL 證書有效（綠色鎖圖標）
- [ ] 手機端正常顯示

需要詳細指南？查看 [DOMAIN_SETUP_GUIDE.md](./DOMAIN_SETUP_GUIDE.md)

**🎉 完成！您的網站現在可以通過 soulcards-app.com 訪問**