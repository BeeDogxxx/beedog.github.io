# 蜜蜂狗 BeeDog 的说明书 - 个人博客网站

## 🌟 网站简介

这是一个基于 HTML/CSS/JavaScript 的个人博客网站，采用黑金风格设计。

### 包含页面

- 🏠 **首页** - 个人简介和作品展示
- 👤 **关于我** - 详细个人介绍
- 💼 **作品展示** - 项目作品集
- 📚 **最近在看的书** - 阅读记录和书单
- 📝 **博客文章** - 技术分享和生活感悟
- 🌍 **旅行足迹** - 用地图展示旅行经历
- 📧 **联系我** - 联系方式和表单

## 🎨 设计特色

- **黑金风格**：深色背景 + 金色元素（#D4AF37）
- **高知风格动效**：优雅、精致的过渡效果
- **中国地图**：SVG 高精度地图，支持省份高亮
- **响应式设计**：适配桌面和移动设备
- **流畅动画**：15种关键帧动画 + 20+种过渡效果

## 📦 文件结构

```
beedog-website/
├── index.html              # 首页
├── about.html              # 关于我
├── portfolio.html          # 作品展示
├── books.html              # 最近在看的书
├── blog.html               # 博客列表
├── blog-detail.html        # 博客详情
├── travel.html             # 旅行足迹
├── contact.html            # 联系我
├── css/                    # 样式文件
│   ├── style.css          # 主样式
│   ├── about.css          # 关于页面样式
│   ├── portfolio.css      # 作品页样式
│   ├── blog.css           # 博客样式
│   ├── contact.css        # 联系页样式
│   └── effects.css        # 动效系统
├── js/                     # JavaScript文件
│   ├── main.js            # 主脚本
│   └── effects.js         # 动效脚本
├── images/                 # 图片资源
│   ├── book-covers/       # 书籍封面
│   └── travel/            # 旅行图片
├── start.sh                # macOS/Linux 启动脚本
├── start.bat               # Windows 启动脚本
├── README.md              # 使用说明
├── GET_STARTED.md         # 快速开始
└── QUICK_START_COVERS.md  # 添加书籍封面指南
```

## 🚀 快速开始

### 方法一：使用启动脚本（推荐）

#### Windows
```bash
双击 start.bat
```

#### macOS/Linux
```bash
chmod +x start.sh
./start.sh
```

然后在浏览器中访问：`http://localhost:8080`

### 方法二：使用 Python

```bash
cd beedog-website
python -m http.server 8000
```

然后在浏览器中访问：`http://localhost:8000`

### 方法三：直接打开

双击 `index.html` 文件即可浏览（部分功能可能受限）

## 📚 添加书籍封面

书单页面包含 4 本书，默认显示占位符图片。如需添加真实封面：

### 快速步骤

1. **下载封面**：访问豆瓣读书、京东图书等平台
2. **重命名文件**：
   - 金字塔原理2 → `pyramid-principle.jpg`
   - 关键对话 → `crucial-conversations.jpg`
   - 原子习惯 → `atomic-habits.jpg`
   - 搞定 → `getting-things-done.jpg`
3. **放置文件**：放入 `images/book-covers/` 目录
4. **刷新浏览器**

详细说明请查看：`QUICK_START_COVERS.md`

## 🌐 部署到服务器

### GitHub Pages

1. 创建 GitHub 仓库
2. 上传所有文件到仓库
3. 进入仓库 Settings → Pages
4. 选择分支（main）并保存
5. 访问 `https://your-username.github.io/your-repo/`

### Vercel（推荐）

1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 "New Project"
3. 上传 `beedog-website` 文件夹
4. 点击 "Deploy"
5. 等待部署完成，获得访问链接

### Netlify

1. 访问 [netlify.com](https://netlify.com) 并登录
2. 拖拽 `beedog-website` 文件夹到页面
3. 等待部署完成
4. 获得访问链接

## 🎨 配色方案

- **主背景**：`#1a1a1a` → `#2d2d2d`（渐变）
- **卡片背景**：`rgba(0, 0, 0, 0.3)`
- **主题金色**：`#D4AF37`
- **金色渐变**：`#D4AF37` → `#f4e4a6` → `#D4AF37`
- **主文字**：`#ffffff`
- **次级文字**：`#888888`

## 📊 旅行足迹

已访问省份（6个）：
- 🐼 四川省
- 🏞️ 浙江省
- 🌆 广东省
- 🏙️ 上海市
- 🏯 江苏省
- ⛰️ 山东省

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式与动画
  - Flexbox
  - Grid
  - CSS Variables
  - Keyframes Animations
  - Transitions
- **JavaScript** - 交互逻辑
  - Canvas API
  - Intersection Observer API
- **Google Fonts**
  - Noto Sans SC（中文字体）
  - Playfair Display（英文字体）

## 📖 更多文档

- `GET_STARTED.md` - 详细的使用和部署指南
- `QUICK_START_COVERS.md` - 添加书籍封面的快速指南

## 📄 许可证

MIT License

## 👤 作者

蜜蜂狗 BeeDog

---

**祝你使用愉快！** 🎉
