#!/bin/bash

echo "========================================"
echo "  蜜蜂狗BeeDog - 网站启动器"
echo "========================================"
echo ""

# 检查 Python 是否安装
if ! command -v python3 &> /dev/null; then
    echo "[错误] 未检测到 Python3，请先安装 Python 3"
    echo "macOS: brew install python3"
    echo "Ubuntu/Debian: sudo apt-get install python3"
    exit 1
fi

# 启动服务器
echo "服务器地址: http://localhost:8000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "========================================"
echo ""

python3 -m http.server 8000
