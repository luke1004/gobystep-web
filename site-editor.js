const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const root = __dirname;
const contentFile = path.join(root, 'site-content', 'apps.json');
const backupDir = path.join(root, '.backups', 'site-content');
const mediaDir = path.join(root, 'public', 'views', 'img', 'custom');
const mediaTypes = new Map([
  ['image/png', '.png'], ['image/jpeg', '.jpg'], ['image/webp', '.webp'],
  ['image/gif', '.gif'], ['video/mp4', '.mp4'], ['video/quicktime', '.mov'],
  ['video/webm', '.webm']
]);

function isLocal(req) {
  const address = req.socket.remoteAddress || '';
  return address === '::1' || address === '127.0.0.1' || address === '::ffff:127.0.0.1';
}

function localOnly(req, res, next) {
  if (!isLocal(req)) return res.sendStatus(403);
  const origin = req.get('origin');
  if (origin && !/^http:\/\/(127\.0\.0\.1|localhost):3000$/.test(origin)) return res.sendStatus(403);
  next();
}

function readContent() {
  return JSON.parse(fs.readFileSync(contentFile, 'utf8'));
}

function text(value, limit = 3000) {
  if (typeof value !== 'string' || value.length > limit) throw new Error('文字内容无效或过长');
  return value.trim();
}

function media(value) {
  const name = text(value, 300);
  if (!/^[\w./ -]+\.(png|jpe?g|webp|gif|mp4|mov|webm)$/i.test(name) || name.includes('..') || name.startsWith('/')) {
    throw new Error('图片或视频路径无效');
  }
  if (!fs.existsSync(path.join(root, 'public', 'views', 'img', name))) {
    throw new Error(`找不到图片或视频：${name}`);
  }
  return name;
}

function picture(value) {
  const name = media(value);
  if (!/\.(png|jpe?g|webp|gif)$/i.test(name)) throw new Error('首页和顶部展示图需要使用图片');
  return name;
}

function lines(value, limit = 30) {
  if (!Array.isArray(value) || value.length > limit) throw new Error('项目数量过多');
  return value.map((item) => text(item, 700)).filter(Boolean);
}

function normalize(input, current) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('内容格式无效');
  if (!Array.isArray(input.sections) || input.sections.length > 12) throw new Error('详情分组无效');
  const sections = input.sections.map((section) => {
    if (!Array.isArray(section.items) || section.items.length > 25) throw new Error('功能项无效');
    return {
      title: text(section.title, 120),
      items: section.items.map((item) => ({
        image: media(item.image),
        title: text(item.title, 140),
        text: text(item.text, 1400),
        ...(item.type === 'video' ? { type: 'video' } : {}),
        ...(item.imageSide === 'right' ? { imageSide: 'right' } : {})
      }))
    };
  });
  return {
    ...current,
    title: text(input.title, 140),
    subtitle: text(input.subtitle, 140),
    image: picture(input.image),
    homeDescription: text(input.homeDescription),
    homeFeatures: lines(input.homeFeatures),
    detailTitle: text(input.detailTitle, 140),
    detailSubtitle: text(input.detailSubtitle, 140),
    detailImage: picture(input.detailImage),
    overview: text(input.overview),
    description: text(input.description),
    features: lines(input.features),
    sections,
    audience: text(input.audience),
    version: text(input.version, 140)
  };
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      fs.mkdirSync(mediaDir, { recursive: true });
      done(null, mediaDir);
    },
    filename(req, file, done) {
      done(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${mediaTypes.get(file.mimetype)}`);
    }
  }),
  limits: { fileSize: 50 * 1024 * 1024, files: 1 },
  fileFilter(req, file, done) {
    done(null, mediaTypes.has(file.mimetype));
  }
}).single('media');

module.exports = function registerSiteEditor(app) {
  app.get('/editor', localOnly, (req, res) => {
    res.sendFile(path.join(root, 'editor', 'index.html'));
  });

  app.get('/api/site-content', (req, res) => {
    res.set('Cache-Control', 'no-store');
    try { res.json(readContent()); }
    catch (error) { res.status(500).json({ error: '无法读取网站内容' }); }
  });

  app.post('/api/site-content', localOnly, (req, res) => {
    try {
      const all = readContent();
      const index = all.findIndex((item) => item.path === req.body?.path);
      if (index < 0) throw new Error('找不到这个 App');
      all[index] = normalize(req.body, all[index]);
      fs.mkdirSync(backupDir, { recursive: true });
      const stamp = new Date().toISOString().replace(/[:.]/g, '-');
      fs.copyFileSync(contentFile, path.join(backupDir, `apps-${stamp}.json`));
      const temp = `${contentFile}.tmp`;
      fs.writeFileSync(temp, `${JSON.stringify(all, null, 2)}\n`);
      fs.renameSync(temp, contentFile);
      res.json({ ok: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/site-media', localOnly, (req, res) => {
    upload(req, res, (error) => {
      if (error) return res.status(400).json({ error: error.message });
      if (!req.file) return res.status(400).json({ error: '请选择 PNG、JPG、WebP、GIF、MP4、MOV 或 WebM 文件' });
      res.json({ image: `custom/${req.file.filename}` });
    });
  });
};
