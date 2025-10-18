#!/bin/bash
echo "測試網絡連接..."
curl -s -o /dev/null -w "%{http_code}" https://www.google.com
echo ""
echo "測試完成"
