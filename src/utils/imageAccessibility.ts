// 圖片無障礙性檢查工具
export const validateImageAccessibility = () => {
  const images = document.querySelectorAll('img');
  const issues = [];

  images.forEach((img, index) => {
    const src = img.getAttribute('src') || '';
    const alt = img.getAttribute('alt') || '';
    
    if (!alt) {
      issues.push({
        type: 'missing-alt',
        element: img,
        message: `圖片缺少alt文本: ${src}`,
        suggestion: `為圖片添加描述性的alt文本，例如: alt="${src.split('/').pop()?.split('.')[0] || '圖片'}"`
      });
    } else if (alt.length < 5) {
      issues.push({
        type: 'short-alt',
        element: img,
        message: `圖片alt文本太短: "${alt}"`,
        suggestion: '提供更詳細的描述，至少5個字符'
      });
    } else if (alt.includes('image') || alt.includes('圖片') || alt.includes('picture')) {
      issues.push({
        type: 'generic-alt',
        element: img,
        message: `圖片alt文本太通用: "${alt}"`,
        suggestion: '提供更具體的描述，說明圖片的內容和功能'
      });
    }
  });

  return {
    totalImages: images.length,
    issues,
    passed: issues.length === 0,
    summary: issues.length === 0 
      ? `✅ 所有 ${images.length} 張圖片都通過了無障礙性檢查`
      : `⚠️ 發現 ${issues.length} 個無障礙性問題，共檢查了 ${images.length} 張圖片`
  };
};

// 最佳實踐建議
export const imageAccessibilityBestPractices = [
  '為所有圖片提供描述性的alt文本',
  '裝飾性圖片使用空alt=""或role="presentation"',
  '避免使用"圖片"、"圖像"等通用詞彙',
  '功能性圖片要描述其功能而非外觀',
  '複雜圖表需要更詳細的描述'
];

export default validateImageAccessibility;