# GoByStep 网站内容添加与 Cloudflare Pages 发布操作手册

这份手册用于以后完成两件事：

1. 给网站添加新的 App、图片、视频或文字材料。
2. 把修改后的网站发布到 Cloudflare Pages。

本项目使用 React + Vite 生成前端页面，保留原网站的 Bootstrap 页面风格。GitHub 用来保存代码，Cloudflare Pages 从 GitHub 自动构建并发布静态网页。

当前公网地址：

~~~text
https://gobystep-static.pages.dev
~~~

当前发布的是静态展示版，适合展示首页、App 详情页、About 和隐私政策。Message、Upload 已隐藏，因为 Cloudflare Pages 不运行本项目的 Express 服务端。

---

## 一、每次修改前先备份

项目目录：

~~~text
/Users/liaoqiusheng/codex/webroot
~~~

修改前，在项目目录中建立一个日期备份文件夹，例如：

~~~text
.backup-20260906-add-new-app
~~~

常见文件用途：

| 文件 | 作用 |
|---|---|
| `frontend/src/content/apps.js` | App、Section、图片和文字配置 |
| `frontend/src/App.jsx` | 页面结构、路由、About 内容 |
| `frontend/src/styles.css` | 尺寸、间距、颜色和布局 |
| `public/views/img/` | 网站使用的图片和视频 |
| `server.js` | 本地 Express 服务器，仅供本地预览 |

不要删除旧备份。需要回退时，从备份中恢复对应文件。

---

## 二、添加图片或视频

### 2.1 图片放置位置

所有固定网页资源放在：

~~~text
public/views/img/
~~~

建议为每个 App 建一个文件夹：

~~~text
public/views/img/my-new-app/
public/views/img/my-new-app/iphone/01-home.jpg
public/views/img/my-new-app/iphone/02-library.jpg
public/views/img/my-new-app/ipad/01-home.jpg
~~~

### 2.2 文件名规则

建议只使用英文字母、数字、短横线和下划线：

~~~text
01-home.jpg
practice-score.png
demo-video.mp4
~~~

尽量不要使用空格、中文、括号或特殊符号。大小写必须完全一致，例如 `01-home.jpg` 和 `01-Home.JPG` 不是同一个文件。

### 2.3 配置图片路径

代码中只填写相对于 `public/views/img/` 的路径。

正确：

~~~js
image: 'my-new-app/iphone/01-home.jpg'
~~~

错误：

~~~js
image: '/Users/liaoqiusheng/Desktop/01-home.jpg'
image: 'public/views/img/my-new-app/iphone/01-home.jpg'
~~~

网页会自动把正确路径转换为 `/views/img/my-new-app/iphone/01-home.jpg`。

---

## 三、添加一个新的 App

打开：

~~~text
frontend/src/content/apps.js
~~~

在 `export const apps = [` 中增加一个对象。可以复制这个模板：

~~~js
{
  name: '我的新 App',
  title: 'A short English title',
  subtitle: 'My New App',
  image: 'my-new-app/01-main.jpg',
  icon: 'my-new-app-icon.png',
  description: '首页显示的简短介绍。',
  path: '/my-new-app',
  overview: '详情页顶部的一句话介绍。',
  audience: '适合哪些人使用。',
  version: 'Version 1.0',
  sections: [
    {
      title: '第一个 Section 的标题',
      items: [
        {
          image: 'my-new-app/01-main.jpg',
          title: '第一张图片的标题',
          text: '这里写图片旁边的文字说明。'
        },
        {
          image: 'my-new-app/02-detail.jpg',
          title: '第二张图片的标题',
          text: '这里写第二张图片旁边的文字说明。'
        }
      ]
    }
  ]
}
~~~

字段说明：

| 字段 | 用途 |
|---|---|
| `name` | App 名称 |
| `title` | 首页大标题 |
| `subtitle` | 首页副标题 |
| `image` | 首页和详情页主图 |
| `icon` | 首页和 About 页面图标 |
| `description` | 首页简短介绍 |
| `path` | 详情页网址，必须唯一 |
| `overview` | 详情页顶部简介 |
| `audience` | 适用人群说明 |
| `version` | 版本信息 |
| `sections` | 详情页分组内容 |

---

## 四、添加 Section、照片和文字

每个 Section 可以放多组“照片 + 标题 + 文字”：

~~~js
sections: [
  {
    title: '开始使用',
    items: [
      {
        image: 'my-new-app/01-main.jpg',
        title: '从这里开始',
        text: '先介绍第一步。'
      }
    ]
  },
  {
    title: '更多功能',
    items: [
      {
        image: 'my-new-app/02-detail.jpg',
        title: '功能说明',
        text: '再介绍第二部分。'
      }
    ]
  }
]
~~~

默认显示为照片在左、文字在右。如果想让照片在右边，增加 `imageSide: 'right'`：

~~~js
{
  image: 'my-new-app/03-result.jpg',
  title: '结果显示',
  text: '这一组会把文字放左边、照片放右边。',
  imageSide: 'right'
}
~~~

添加视频时，先把视频放到 `public/views/img/`，再填写：

~~~js
{
  image: 'my-new-app/demo-video.mp4',
  title: '操作演示',
  text: '这里写视频说明。',
  type: 'video'
}
~~~

视频会显示播放、暂停和进度控制。推荐使用浏览器兼容性较好的 `.mp4` 格式；`.mov` 在部分浏览器中可能无法播放。

目前视频需要随项目代码一起发布，不能通过网站上已经隐藏的 Upload 功能直接上传。添加视频的完整流程是：

~~~text
1. 把视频放入 public/views/img/ 下的 App 文件夹
2. 在 frontend/src/content/apps.js 中加入 type: 'video'
3. 执行 npm run build
4. 本地打开网站检查视频
5. git add .
6. git commit -m "Add app video"
7. git push
8. 等待 Cloudflare Pages 自动重新发布
~~~

视频文件过大可能会增加构建时间和网页加载时间。YouTube、Bilibili 等外部视频网站目前不能直接使用上面的 `type: 'video'` 配置，需要另外增加嵌入代码。

---

## 五、把 App 加到 About 页面

打开 `frontend/src/App.jsx`，找到 About 页面的 `items`，在数组末尾增加：

~~~js
['my-new-app-icon.png', '我的新 App']
~~~

图标必须放在 `public/views/img/my-new-app-icon.png`。网页会自动使用统一大小排列图标。

---

## 六、修改标题、文字和隐私政策

通常只需要编辑 `frontend/src/content/apps.js`：

~~~js
title: 'Practice English by speaking',
subtitle: 'Say It Out — English',
description: '首页显示的简短介绍。',
~~~

如果详情页需要单独标题，可以增加：

~~~js
detailTitle: 'Practice English by speaking',
detailSubtitle: 'Say It Out — English',
~~~

隐私政策可以放在 App 配置中：

~~~js
privacyPolicy: {
  intro: '这里写隐私政策的开头说明。',
  items: [
    ['Information we use', '这里说明 App 使用哪些信息。'],
    ['Microphone and files', '这里说明麦克风和文件权限的用途。'],
    ['Storage and sharing', '这里说明数据如何保存以及是否分享。'],
    ['Your choices', '这里说明用户可以如何删除或关闭权限。']
  ],
  updated: 'Last updated: September 5, 2026'
}
~~~

隐私政策必须和 App 的真实行为一致，不能凭空承诺是否上传语音、是否使用第三方服务、是否永久保存数据。

---

## 七、本地运行和检查

第一次安装依赖：

~~~bash
cd /Users/liaoqiusheng/codex/webroot
npm install
cd frontend
npm install
cd ..
~~~

每次修改后构建：

~~~bash
cd /Users/liaoqiusheng/codex/webroot
npm run build
~~~

看到 `✓ built in ...ms`，说明构建成功。本地启动使用 `npm start`，然后打开 `http://127.0.0.1:3000/`。停止网站时，在终端按 `Control + C`。

本地查看英语说起来 App 详情页：

~~~text
http://127.0.0.1:3000/sayitout-en
~~~

打开页面后向下滚动到底部，就可以看到 `English Privacy Statement`。本地地址打不开时，先确认终端中的 `npm start` 仍在运行。

本地检查：首页 App 顺序、图片、标题、副标题、详情页链接；详情页 Section、照片左右位置、文字、隐私政策；About 图标大小和排列。

---

## 八、发布前的安全检查

上传 GitHub 前检查 `server.js`、`db/`、`uploads/` 和 `.env` 中是否有真实密码、API Key 或私人信息。不要把数据库密码、私人证书、身份证、合同或私人照片提交到公开仓库。

建议 `.gitignore` 至少包含：

~~~text
node_modules/
frontend/node_modules/
.env
.env.*
!.env.example
.DS_Store
~~~

如果密码已经上传过 GitHub，即使后来删除，旧版本仍可能保留在 Git 历史中，应立即修改密码。

---

## 九、上传到 GitHub

登录 GitHub：`https://github.com`。

第一次上传，在项目根目录执行：

~~~bash
cd /Users/liaoqiusheng/codex/webroot
git init
git add .
git commit -m "Prepare GoByStep website"
git branch -M main
git remote add origin https://github.com/luke1004/gobystep-web.git
git push -u origin main
~~~

以后修改完成后执行：

~~~bash
cd /Users/liaoqiusheng/codex/webroot
git add .
git commit -m "Update app content"
git push
~~~

如果 GitHub 要求验证，使用 GitHub 登录方式或 Personal Access Token；普通账号密码通常不能作为 Git 密码。

---

## 十、第一次发布到 Cloudflare Pages

### 10.1 打开 Pages

打开 `https://dash.cloudflare.com`，登录后依次点击：

1. `Workers 和 Pages`。
2. `创建应用程序`。
3. `Pages`。
4. 从 Git 仓库导入。
5. `GitHub`。

第一次使用时，Cloudflare 可能要求授权 GitHub Pages 应用访问仓库。只授权包含本网站的仓库即可。

### 10.2 选择仓库

选择：

~~~text
luke1004/gobystep-web
~~~

如果看不到仓库，在 GitHub 的 Cloudflare Pages 应用设置中增加该仓库访问权限，然后回到 Cloudflare 刷新。

### 10.3 填写构建设置

填写：

~~~text
项目名称: gobystep-static
生产分支: main
框架预设: None（无）
构建命令: npm install --include=optional --prefix frontend && npm run build
构建输出目录: public
根目录: 留空
~~~

`public` 是最终发布的静态网页目录。构建命令中的 `--include=optional` 用于确保 Cloudflare Linux 构建环境安装 Rollup 所需的可选依赖。

### 10.4 部署

确认设置无误后点击 `保存并部署`。Cloudflare 会下载 GitHub 代码、安装依赖、运行构建命令，并把 `public` 目录发布到 `pages.dev`。

成功后打开：

~~~text
https://gobystep-static.pages.dev
~~~

英语说起来 App 的公网详情页：

~~~text
https://gobystep-static.pages.dev/sayitout-en
~~~

打开后向下滚动到底部，可以查看最新的 `English Privacy Statement`。如果公网仍是旧内容，先确认已经执行 `git push`，再等待 Cloudflare Pages 完成新的部署。

以后每次推送到 `main`，Cloudflare Pages 会自动重新构建和发布。

---

## 十一、发布后的检查

打开公网地址，检查：

~~~text
/
/about
/sayitout-en
~~~

重点确认首页、详情页、图片、Section、文字、About 图标和隐私政策都正常。直接刷新详情页也应能打开。Message 和 Upload 当前不属于静态展示版功能。

如果仍显示旧页面：

1. 确认 GitHub 出现了最新提交。
2. 打开 Cloudflare Pages 项目的部署记录。
3. 确认最新部署状态为成功。
4. 浏览器执行强制刷新。

---

## 十二、以后修改网站的固定流程

~~~text
1. 备份要修改的文件
2. 图片或视频放入 public/views/img/
3. 修改 frontend/src/content/apps.js
4. 必要时修改 frontend/src/App.jsx 或 frontend/src/styles.css
5. npm run build
6. npm start，本地检查
7. git add .
8. git commit -m "Describe the change"
9. git push
10. 等待 Cloudflare Pages 自动部署
11. 打开公网网址检查
~~~

可以记成：

~~~text
备份 → 放图片 → 改配置 → 构建 → 本地检查 → GitHub → Cloudflare Pages
~~~

---

## 十三、常见问题

### 图片不显示

检查图片是否在 `public/views/img/` 下，配置路径是否相对于该目录，文件名大小写是否一致，以及图片是否已经提交到 GitHub。

### 本地构建失败

优先检查逗号、引号、大括号、中括号和文件路径。错误信息中的文件名和行号通常能直接定位问题。

### Cloudflare 构建失败：找不到 Rollup Linux 依赖

确认 Cloudflare 的构建命令完整填写为：

~~~text
npm install --include=optional --prefix frontend && npm run build
~~~

不要只填写 `npm run build`，因为 Cloudflare Linux 环境可能没有安装前端目录中的可选依赖。

### GitHub 推送失败

检查仓库地址、GitHub 登录状态、仓库写入权限和 Personal Access Token。GitHub 不接受普通账号密码作为 Git 密码。

### Cloudflare Pages 仍显示旧页面

检查 GitHub 是否有新提交、Cloudflare 是否部署了最新提交、部署状态是否成功，然后强制刷新浏览器。

---

## 十四、最简速查表

~~~text
1. 备份
2. 图片放到 public/views/img/
3. 编辑 frontend/src/content/apps.js
4. 填写 name、title、subtitle、image、icon、path
5. 配置 sections 和 items
6. 如需 About 图标，编辑 frontend/src/App.jsx
7. npm run build
8. npm start
9. 浏览器检查
10. git add .
11. git commit -m "Add app"
12. git push
13. 等待 Cloudflare Pages 自动部署
14. 打开 https://gobystep-static.pages.dev 检查
~~~

最重要的原则：

~~~text
先备份，再修改；先本地检查，再上传；确认 Cloudflare Pages 部署成功后，再把网址告诉别人。
~~~

官方参考：

- [Cloudflare Pages Git 集成](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Cloudflare Pages 构建配置](https://developers.cloudflare.com/pages/platform/build-configuration)
