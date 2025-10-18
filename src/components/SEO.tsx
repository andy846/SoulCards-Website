import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'SoulCards - AI 智慧塔羅牌占卜應用',
  description = '透過 AI 智慧解讀塔羅牌，獲得人生指引與內心洞察。精美卡牌設計，隱私保護，即時占卜體驗。立即下載 SoulCards，探索您的神秘世界。',
  keywords = 'SoulCards, 塔羅牌, AI占卜, 塔羅解讀, 人生指引, 神秘學, 占卜應用, iOS應用, 心靈成長, 靈性指導',
  image = 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=SoulCards%20app%20logo%20mystical%20tarot%20cards%20golden%20purple%20cosmic%20design&image_size=square',
  url = 'https://soulcards.app',
  type = 'website',
  author = 'SoulCards Team',
  publishedTime,
  modifiedTime,
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'SoulCards',
    description: description,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SoulCards',
      logo: {
        '@type': 'ImageObject',
        url: image,
      },
    },
    downloadUrl: 'https://apps.apple.com/app/soulcards',
    screenshot: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=SoulCards%20app%20screenshot%20tarot%20reading%20interface&image_size=portrait_4_3',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=SoulCards%20app%20card%20selection%20screen&image_size=portrait_4_3',
    ],
  };

  return (
    <Helmet>
      {/* 基本 Meta 標籤 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Open Graph Meta 標籤 */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="SoulCards" />
      <meta property="og:locale" content="zh_TW" />
      
      {/* Twitter Card Meta 標籤 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@SoulCardsApp" />
      <meta name="twitter:creator" content="@SoulCardsApp" />
      
      {/* Apple Meta 標籤 */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="SoulCards" />
      <link rel="apple-touch-icon" href={image} />
      
      {/* 其他 Meta 標籤 */}
      <meta name="theme-color" content="#663399" />
      <meta name="msapplication-TileColor" content="#663399" />
      <meta name="msapplication-TileImage" content={image} />
      
      {/* 時間相關 Meta 標籤 */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* 語言替代 */}
      <link rel="alternate" hrefLang="zh-TW" href={url} />
      <link rel="alternate" hrefLang="zh-CN" href={`${url}/cn`} />
      <link rel="alternate" hrefLang="en" href={`${url}/en`} />
      
      {/* Preconnect 優化 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://trae-api-sg.mchost.guru" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://apps.apple.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* 結構化資料 */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* 額外的 App Store 優化 */}
      <meta name="apple-itunes-app" content="app-id=YOUR_APP_ID, app-argument=https://soulcards.app" />
      
      {/* 安全性標頭 */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* 效能優化 */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      
      {/* PWA 支援 */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Helmet>
  );
};

export default SEO;