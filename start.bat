@echo off
chcp 65001 >nul
echo ========================================
echo   蜜蜂狗BeeDog - 网站启动器
echo ========================================
echo.

REM 检查 Python 是否安装
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Python，请先安装 Python
    echo 下载地址: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM 启动服务器
echo 服务器地址: http://localhost:8000
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

python -m http.server 8000

pause
