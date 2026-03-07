# 🚀 GitHub Pages 部署指南

本指南将帮助您将网站部署到 GitHub Pages，完全免费！

## 📋 准备工作

### 1. 注册 GitHub 账户
如果您还没有 GitHub 账户：
1. 访问 https://github.com
2. 点击右上角的 "Sign up"
3. 填写注册信息
4. 验证邮箱

### 2. 安装 Git（可选，推荐）

#### Windows
1. 访问 https://git-scm.com/download/win
2. 下载并安装 Git
3. 安装时使用默认选项即可

#### macOS
```bash
# 使用 Homebrew 安装
brew install git
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt-get install git

# CentOS/RHEL
sudo yum install git
```

---

## 📦 部署步骤

### 方式一：使用 GitHub 网页界面（最简单）

#### 步骤 1：创建新仓库
1. 登录 GitHub
2. 点击右上角的 "+" 按钮
3. 选择 "New repository"
4. 填写仓库信息：
   - **Repository name**：`beedog-website`（或您喜欢的名字）
   - **Description**：蜜蜂狗 BeeDog 的说明书 - 个人博客网站
   - **Public/Private**：选择 **Public**（GitHub Pages 需要）
   - **Initialize with**：**不勾选任何选项**
5. 点击 "Create repository"

#### 步骤 2：上传文件
1. 在仓库页面，点击 "uploading an existing file"
2. 或直接将 `beedog-website-package` 文件夹内的所有文件拖拽到网页中
3. 等待文件上传完成
4. 在底部 "Commit changes" 输入提交信息：
   - Title：`Initial commit`
   - Description：`Add BeeDog website files`
5. 点击 "Commit changes"

#### 步骤 3：启用 GitHub Pages
1. 在仓库页面，点击 "Settings"（顶部菜单）
2. 在左侧菜单中，找到 "Pages"（在 "Code and automation" 部分）
3. 在 "Build and deployment" 部分：
   - **Source**：选择 "Deploy from a branch"
   - **Branch**：选择 `main`（或 `master`）
   - **Folder**：选择 `/ (root)`
4. 点击 "Save"

#### 步骤 4：等待部署
1. 等待 1-5 分钟
2. GitHub 会自动部署您的网站
3. 部署成功后，页面顶部会显示一个链接：
   ```
   https://your-username.github.io/beedog-website/
   ```
4. 点击链接即可访问您的网站！

---

### 方式二：使用 Git 命令行（推荐）

#### 步骤 1：初始化 Git 仓库

打开终端（Terminal）或命令提示符（CMD），进入项目文件夹：

```bash
# 进入项目文件夹
cd path/to/beedog-website-package

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Add BeeDog website"
```

#### 步骤 2：在 GitHub 创建远程仓库

1. 访问 GitHub，创建新仓库（参考方式一的步骤 1）
2. 仓库名称：`beedog-website`
3. **不要**勾选 "Initialize with README"
4. 点击 "Create repository"

#### 步骤 3：连接到 GitHub 仓库

创建仓库后，GitHub 会显示仓库地址，复制仓库 URL：
```
https://github.com/your-username/beedog-website.git
```

在终端中执行：

```bash
# 添加远程仓库
git remote add origin https://github.com/your-username/beedog-website.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 步骤 4：输入 GitHub 凭证

如果提示输入用户名和密码：
- **Username**：您的 GitHub 用户名
- **Password**：**不是**您的登录密码，而是 **Personal Access Token**

##### 如何创建 Personal Access Token？

1. 登录 GitHub
2. 点击右上角头像 → "Settings"
3. 左侧菜单 → "Developer settings"
4. 点击 "Personal access tokens" → "Tokens (classic)"
5. 点击 "Generate new token" → "Generate new token (classic)"
6. 填写信息：
   - Note：`GitHub Pages Deployment`
   - Expiration：选择 `No expiration` 或一个日期
   - 勾选权限：
     - ✅ `repo`（完整权限）
     - ✅ `workflow`（如果使用 GitHub Actions）
7. 点击 "Generate token"
8. **复制生成的 token**（只显示一次，请立即保存！）

在终端中输入密码时，粘贴 token 即可。

#### 步骤 5：启用 GitHub Pages

参考方式一的步骤 3。

---

## 🎯 自定义域名（可选）

如果您有自己的域名，可以绑定到 GitHub Pages：

### 步骤 1：添加自定义域名

1. 在仓库的 "Settings" → "Pages"
2. 在 "Custom domain" 中输入您的域名：
   - 例如：`www.yourdomain.com` 或 `yourdomain.com`
3. 点击 "Save"

### 步骤 2：配置 DNS

在您的域名服务商处添加 DNS 记录：

#### 方式 A：使用 CNAME（推荐）

| 类型 | 名称 | 内容 |
|------|------|------|
| CNAME | www | your-username.github.io |
| CNAME | @ | your-username.github.io |

#### 方式 B：使用 A 记录

| 类型 | 名称 | 内容 |
|------|------|------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

### 步骤 3：启用 HTTPS

1. 在 "Pages" 设置中
2. 勾选 "Enforce HTTPS"
3. 等待几分钟，SSL 证书会自动生成

---

## 🔄 更新网站

### 方式一：通过网页界面

1. 进入仓库页面
2. 点击文件名进行编辑
3. 或拖拽新文件上传
4. 在底部 "Commit changes" 输入信息
5. 点击 "Commit changes"
6. 等待 1-5 分钟，GitHub 自动重新部署

### 方式二：使用 Git 命令行

```bash
# 进入项目文件夹
cd path/to/beedog-website-package

# 查看更改
git status

# 添加更改的文件
git add .

# 提交更改
git commit -m "Update website content"

# 推送到 GitHub
git push
```

---

## ❓ 常见问题

### 1. 部署后访问 404 错误

**原因**：GitHub Pages 还在部署中

**解决**：
- 等待 1-5 分钟
- 刷新页面
- 检查仓库的 "Settings" → "Pages" 查看部署状态

### 2. 样式显示异常

**原因**：CSS 文件路径错误

**解决**：
- 确保所有文件都在仓库根目录
- 检查 HTML 中的 CSS 链接路径是否正确
- 例如：`<link rel="stylesheet" href="css/style.css">`

### 3. 图片无法显示

**原因**：图片路径错误或文件未上传

**解决**：
- 确保 `images/` 文件夹已上传
- 检查图片路径是否正确
- 例如：`<img src="images/book-covers/book-cover-placeholder.svg">`

### 4. 推送失败：Authentication failed

**原因**：密码过期或错误

**解决**：
- 创建新的 Personal Access Token
- 参考"如何创建 Personal Access Token"部分

### 5. 仓库必须是 Public

**原因**：GitHub Pages 只支持 Public 仓库

**解决**：
- 进入仓库 "Settings"
- 滚动到底部 "Danger Zone"
- 点击 "Change visibility" → "Make public"

---

## 📊 查看部署状态

1. 进入仓库页面
2. 点击 "Actions"（顶部菜单）
3. 查看最新的部署记录：
   - ✅ 绿色勾：部署成功
   - ❌ 红色叉：部署失败（点击查看错误信息）

---

## 🎉 完成！

恭喜！您的网站已成功部署到 GitHub Pages！

### 访问地址

- **默认地址**：`https://your-username.github.io/beedog-website/`
- **自定义域名**：`https://www.yourdomain.com`（如果配置）

### 下一步

- 📚 添加真实书籍封面：查看 `QUICK_START_COVERS.md`
- ✨ 自定义样式：修改 CSS 文件
- 📝 添加更多内容：编辑 HTML 文件
- 🌐 绑定自定义域名（可选）

---

## 📖 更多资源

- [GitHub Pages 官方文档](https://docs.github.com/pages)
- [Git 官方文档](https://git-scm.com/doc)
- [GitHub 官方教程](https://docs.github.com/get-started)

---

**祝你部署顺利！** 🚀✨
