# GoByStep 网站操作手册

这份手册用于以后完成两件事：

1. 给网站添加新的 App、图片、视频或文字材料。
2. 把修改后的网站发布到 Render，让别人通过互联网访问。

本项目当前使用：

- React + Vite：网页前端。
- Node.js + Express：网站服务器。
- Bootstrap：保留原网站的页面风格。
- GitHub：保存代码并提供给 Render。
- Render：运行网站并提供公网网址。

如果只是修改 App 介绍文字和图片，通常只需要编辑 \`frontend/src/content/apps.js\`，不需要学习 React。

---

## 一、每次修改前先备份

开始修改前，先备份准备改动的文件。

项目目录：

~~~text
/Users/liaoqiusheng/codex/webroot
~~~

可以在项目目录中建立一个日期备份文件夹，例如：

~~~text
.backup-20260906-add-new-app
~~~

常见文件用途：

| 文件 | 作用 |
|---|---|
| \`frontend/src/content/apps.js\` | App、Section、图片、文字配置 |
| \`frontend/src/App.jsx\` | 页面结构、路由、About 内容 |
| \`frontend/src/styles.css\` | 尺寸、间距、颜色和布局 |
| \`public/views/img/\` | 网站使用的图片和视频 |
| \`server.js\` | Express 服务器配置 |

不要删除旧备份。需要回退时，从备份中恢复原文件。

---

## 二、添加图片或视频材料

### 2.1 图片放在哪里？

所有固定网页资源都放在：

~~~text
public/views/img/
~~~

例如，为新 App 建一个文件夹：

~~~text
public/views/img/my-new-app/
~~~

如果要区分设备，可以这样保存：

~~~text
public/views/img/my-new-app/iphone/01-home.jpg
public/views/img/my-new-app/iphone/02-library.jpg
public/views/img/my-new-app/ipad/01-home.jpg
~~~

### 2.2 文件名注意事项

建议文件名只使用英文字母、数字、短横线和下划线：

~~~text
01-home.jpg
practice-score.png
demo-video.mp4
~~~

尽量不要使用空格、中文、括号或特殊符号。

文件名大小写必须完全一致：

~~~text
01-home.jpg
~~~

和下面的文件名不是同一个：

~~~text
01-Home.JPG
~~~

### 2.3 配置中如何填写路径？

代码中只填写相对于 \`public/views/img/\` 的路径。

正确：

~~~js
image: 'my-new-app/iphone/01-home.jpg'
~~~

错误：

~~~js
image: '/Users/liaoqiusheng/Desktop/01-home.jpg'
~~~

错误：

~~~js
image: 'public/views/img/my-new-app/iphone/01-home.jpg'
~~~

网页会自动把正确配置转换成：

~~~text
/views/img/my-new-app/iphone/01-home.jpg
~~~

---

## 三、添加一个新的 App

### 3.1 打开配置文件

打开：

~~~text
frontend/src/content/apps.js
~~~

文件中 \`export const apps = [\` 后面是一组一组的 App 配置。

每个 App 都用大括号包起来，并用逗号和下一个 App 分开。

### 3.2 新 App 模板

可以复制下面模板，然后替换内容：

~~~js
{
  name: '我的新 App',
  title: 'A short English title',
  subtitle: 'My New App',
  image: 'my-new-app/01-main.jpg',
  icon: 'my-new-app-icon.png',
  description: '这里写首页显示的简短介绍。',
  path: '/my-new-app',
  overview: '这里写详情页顶部的一句话介绍。',
  audience: '这里写适合哪些人使用。',
  version: 'Version 1.0',
  sections: [
    {
      title: '第一个 Section 的标题',
      items: [
        {
          image: 'my-new-app/01-main.jpg',
          title: '第一张图片的标题',
          text: '这里写这张图片旁边的文字说明。'
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

### 3.3 字段说明

| 字段 | 用途 |
|---|---|
| \`name\` | 详情页顶部的 App 名称 |
| \`title\` | 首页的大标题 |
| \`subtitle\` | 首页标题下面的副标题 |
| \`image\` | 首页和详情页顶部的主图 |
| \`icon\` | 首页和 About 页面使用的图标 |
| \`description\` | 首页显示的简短介绍 |
| \`path\` | 详情页网址，必须唯一，例如 \`/my-new-app\` |
| \`overview\` | 详情页顶部简介 |
| \`audience\` | 详情页底部的适用人群 |
| \`version\` | 版本信息 |
| \`sections\` | 详情页的分组内容 |

### 3.4 添加多个 Section

在 \`sections\` 中继续增加对象：

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

网页会自动显示为：

~~~text
Section 标题
左侧图片 + 右侧标题和文字
左侧图片 + 右侧标题和文字

下一个 Section 标题
左侧图片 + 右侧标题和文字
~~~

默认布局是照片在左边、文字在右边。

如果某一组需要照片在右边，增加：

~~~js
imageSide: 'right'
~~~

示例：

~~~js
{
  image: 'my-new-app/03-result.jpg',
  title: '结果显示在右侧',
  text: '这一组会把文字放左边、照片放右边。',
  imageSide: 'right'
}
~~~

### 3.5 添加视频

先把视频放到 \`public/views/img/\` 下，再配置：

~~~js
{
  image: 'my-new-app/demo-video.mp4',
  title: '操作演示',
  text: '这里写视频说明。',
  type: 'video'
}
~~~

字段仍然叫 \`image\`，但 \`type: 'video'\` 会显示视频播放器。

---

## 四、把 App 加到 About 页面

如果还希望 App 图标出现在 About 页面，打开：

~~~text
frontend/src/App.jsx
~~~

找到：

~~~js
const items = [
  ['sayitout.png', 'Say It Out'],
  ['eQuicker24.png', 'eQuicker24 v1.0'],
  ['showbest.png', 'ShowAce v2.0']
];
~~~

在最后增加：

~~~js
['my-new-app-icon.png', '我的新 App']
~~~

最终类似：

~~~js
const items = [
  ['sayitout.png', 'Say It Out'],
  ['eQuicker24.png', 'eQuicker24 v1.0'],
  ['showbest.png', 'ShowAce v2.0'],
  ['my-new-app-icon.png', '我的新 App']
];
~~~

图标文件必须放在：

~~~text
public/views/img/my-new-app-icon.png
~~~

About 页面会自动使用统一大小排列图标。

---

## 五、修改标题和文字

通常只编辑：

~~~text
frontend/src/content/apps.js
~~~

例如：

~~~js
title: 'Practice English by speaking',
subtitle: 'Say It Out — English',
~~~

首页会显示：

~~~text
Practice English by speaking
Say It Out — English
~~~

如果只有详情页需要不同标题，可以增加：

~~~js
detailTitle: 'Practice English by speaking',
detailSubtitle: 'Say It Out — English',
~~~

详情页会优先使用 \`detailTitle\` 和 \`detailSubtitle\`。

修改时注意：

- 字符串必须放在单引号或双引号中。
- 每项之间要有逗号。
- 不要删除对象两边的大括号。
- 不要删除 \`sections\` 和 \`items\` 的中括号。
- 修改后一定执行构建检查。

---

## 六、添加隐私政策

如果某个 App 需要隐私政策，可以在该 App 配置中增加：

~~~js
privacyPolicy: {
  intro: '这里写隐私政策的开头说明。',
  items: [
    ['Information we use', '这里说明 App 使用哪些信息。'],
    ['Microphone and files', '这里说明麦克风和文件权限的用途。'],
    ['Storage and sharing', '这里说明数据如何保存和是否分享。'],
    ['Your choices', '这里说明用户可以如何删除或关闭权限。']
  ],
  updated: 'Last updated: September 5, 2026'
}
~~~

只要存在 \`privacyPolicy\`，详情页底部就会自动显示 Privacy Policy。

隐私政策必须和 App 的真实行为一致，不能凭空承诺：

- 是否把语音上传到服务器。
- 是否使用第三方语音识别服务。
- 数据是否永久保存。
- 是否收集账号、邮箱或位置。

功能变化后，隐私政策也要一起更新。

---

## 七、本地运行和检查

### 7.1 第一次安装依赖

在终端执行：

~~~bash
cd /Users/liaoqiusheng/codex/webroot
npm install
cd frontend
npm install
cd ..
~~~

以后如果没有删除 \`node_modules\`，通常不需要重复安装。

### 7.2 构建前端

每次修改后，在项目根目录执行：

~~~bash
npm run build
~~~

看到类似下面的结果，说明构建成功：

~~~text
✓ built in ...ms
~~~

如果构建失败，先不要发布。根据错误提示检查文件名、行号、逗号、括号和引号。

### 7.3 启动网站

在项目根目录执行：

~~~bash
npm start
~~~

打开：

~~~text
http://127.0.0.1:3000/
~~~

停止网站时，在终端按：

~~~text
Control + C
~~~

### 7.4 本地检查清单

首页：

- App 是否出现在正确位置。
- 图片是否显示。
- 标题、副标题和简介是否正确。
- \`Learn More\` 是否能点击。

详情页：

- URL 是否正确，例如 \`/my-new-app\`。
- 主图是否显示。
- Section 标题是否正确。
- 默认是否为左图右文。
- \`imageSide: 'right'\` 是否反向显示。
- 图片和文字是否清楚。
- 隐私政策是否显示。

About 页面：

- 新 App 图标是否出现。
- 图标大小是否一致。
- 宽屏下四个图标是否能排成一排。

---

## 八、发布前的安全检查

当前项目中有旧的数据库连接配置。上传 GitHub 之前，必须检查 \`server.js\` 和其他文件中有没有真实密码、API Key 或私人信息。

重点检查：

~~~text
server.js
db/
uploads/
.env
~~~

不要提交：

- 数据库密码。
- API 密钥。
- 私人证书。
- 身份证、合同或私人照片。
- 不准备公开的上传文件。

建议创建 \`.gitignore\`，至少包含：

~~~text
node_modules/
frontend/node_modules/
.env
.env.*
!.env.example
.DS_Store
~~~

如果密码已经上传到 GitHub，即使后来删除文件，旧版本可能仍然保留在 Git 历史中，应该立即修改密码。

---

## 九、第一次上传到 GitHub

### 9.1 登录 GitHub

打开：

~~~text
https://github.com
~~~

点击右上角 \`Sign in\` 登录。没有账号时点击 \`Sign up\` 注册并完成邮箱验证。

### 9.2 创建仓库

登录后：

1. 点击右上角 \`+\`。
2. 选择 \`New repository\`。
3. 输入仓库名称，例如 \`gobystep-web\`。
4. 选择 \`Private\` 或 \`Public\`。
5. 建议不要勾选自动创建 README。
6. 点击 \`Create repository\`。

新手可以先选择 \`Private\`，确认网站正常后再决定是否公开。

### 9.3 第一次上传

在项目根目录执行：

~~~bash
cd /Users/liaoqiusheng/codex/webroot
git init
git add .
git commit -m "Prepare GoByStep website"
git branch -M main
git remote add origin https://github.com/luke1004/gobystep-web.git
git push -u origin main
~~~

把 \`你的用户名\` 和仓库名称替换成自己的信息。

如果 GitHub 要求登录，按提示使用 GitHub 登录方式或 Personal Access Token。GitHub 通常不接受直接把普通账号密码作为 Git 密码。

### 9.4 以后上传修改

每次本地检查完成后执行：

~~~bash
cd /Users/liaoqiusheng/codex/webroot
git add .
git commit -m "Update app content"
git push
~~~

Render 会检测到 GitHub 新提交并自动重新部署。

---

## 十、在 Render 第一次发布

### 10.1 注册并连接 GitHub

打开：

~~~text
https://render.com
~~~

可以使用 GitHub 登录。

登录 Render 后，按照页面提示授权 Render 读取 GitHub 仓库。

### 10.2 创建 Web Service

在 Render 控制台：

1. 点击 \`New\`。
2. 选择 \`Web Service\`。
3. 选择刚才的 GitHub 仓库。
4. 填写服务名称，例如 \`gobystep-web\`。
5. 选择区域。
6. 方案选择 \`Free\`。

当前项目必须选择 \`Web Service\`，不能选择 \`Static Site\`，因为网站需要运行 Express 服务端。

### 10.3 填写构建设置

建议填写：

~~~text
Root Directory:
留空
~~~

~~~text
Build Command:
npm install && npm run build
~~~

~~~text
Start Command:
npm start
~~~

### 10.4 发布前修正端口

Render 会自动提供端口。当前项目的 \`server.js\` 需要使用环境变量端口：

~~~js
app.listen(process.env.PORT || 3000, function () {
  console.log(`listening on ${process.env.PORT || 3000}`);
});
~~~

这样：

- 本地运行时使用 \`3000\`。
- Render 上使用 Render 分配的端口。

修改后重新执行：

~~~bash
npm run build
git add server.js
git commit -m "Use Render port"
git push
~~~

如果不改端口，Render 可能构建成功，但网站无法正常访问。

### 10.5 点击部署

检查设置无误后点击 \`Create Web Service\` 或 \`Deploy\`。

Render 会：

1. 下载 GitHub 代码。
2. 安装依赖。
3. 执行前端构建。
4. 启动 Express。
5. 分配公网网址。

成功后会显示类似：

~~~text
https://gobystep-web.onrender.com
~~~

点击这个地址即可打开网站。

---

## 十一、发布后的检查

打开 Render 公网地址，检查：

~~~text
/
/about
/sayitout-en
/message
/uploadFiles
~~~

重点确认：

- 首页显示最新 App。
- 详情页图片正常。
- Section 和文字完整。
- About 页面图标正常。
- 隐私政策显示。
- 直接刷新详情页仍然可以打开。

如果页面还是旧版本：

1. 确认 GitHub 有最新提交。
2. 打开 Render 的 \`Deploys\` 页面。
3. 确认最新部署状态是 \`Live\` 或 \`Deployed\`。
4. 浏览器执行强制刷新。

---

## 十二、以后修改网站的固定流程

以后每次修改，按照这个顺序：

1. 备份要修改的文件。
2. 把图片或视频放入 \`public/views/img/\`。
3. 修改 \`frontend/src/content/apps.js\`。
4. 如果需要改变页面结构，再修改 \`frontend/src/App.jsx\`。
5. 执行 \`npm run build\`。
6. 执行 \`npm start\`，打开本地网址检查。
7. 执行 \`git add .\`。
8. 执行 \`git commit -m "Describe the change"\`。
9. 执行 \`git push\`。
10. 等待 Render 自动部署。
11. 打开公网网址检查。

可以记成：

~~~text
备份 → 放图片 → 改配置 → 构建 → 本地检查 → GitHub → Render
~~~

---

## 十三、Render 免费版限制

Render 免费 Web Service 可以运行 Express，适合个人网站、测试和 App 展示。

主要限制：

- 一段时间没人访问后会休眠。
- 重新访问时第一次打开可能较慢。
- \`uploads/\` 中后来上传的文件不能保证永久保存。
- 不适合保存重要留言、用户资料或正式业务数据。
- 免费数据库有容量和期限限制。

固定资源，例如：

~~~text
public/views/img/
~~~

会随代码一起部署。

用户运行网站后上传到服务器的文件，例如：

~~~text
uploads/
~~~

不应当作为永久存储使用。

官方说明：

- https://render.com/docs/free
- https://render.com/docs/web-services
- https://render.com/docs/your-first-deploy

---

## 十四、常见问题

### 图片不显示

检查：

1. 图片是否放在 \`public/views/img/\` 下。
2. 配置路径是否正确，例如 \`my-new-app/01-main.jpg\`。
3. 文件名大小写是否完全一致。
4. 图片是否已经加入 GitHub。

### 构建失败

优先检查：

- 少了逗号。
- 字符串没有引号。
- \`sections\` 或 \`items\` 没有闭合。
- 文件路径写错。
- 复制模板时多复制或少复制了大括号。

### Render 构建成功但打不开

检查：

- \`Start Command\` 是否为 \`npm start\`。
- \`server.js\` 是否使用 \`process.env.PORT || 3000\`。
- Render 日志中是否有启动错误。
- 免费服务是否正在从休眠状态启动。

### GitHub 推送失败

检查：

- GitHub 仓库地址是否正确。
- 是否登录 GitHub。
- 是否有仓库写入权限。
- 是否使用 Personal Access Token。

### Render 仍然显示旧页面

检查：

- GitHub 是否出现新提交。
- Render 是否部署了最新提交。
- 部署状态是否成功。
- 浏览器是否缓存旧页面。

---

## 十五、最简速查表

添加一个新的 App：

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
13. 等待 Render 自动部署
14. 打开 Render 公网地址检查
~~~

最重要的原则：

~~~text
先备份，再修改；先本地检查，再上传；确认 Render 部署成功后，再把网址告诉别人。
~~~
