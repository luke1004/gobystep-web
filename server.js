console.log('Starting express server...');
const express = require('express');

const multer = require('multer');

const path = require('path');
const fs = require('fs');

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

// 设置存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    //cb(null,  'U' + Date.now() + '-' + file.originalname)
	cb(null,  file.originalname)
  }
})
 
const upload = multer({ storage: storage });
 
// 单文件上传
app.post('/upload', upload.single('myFile'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send(req.file); //'File uploaded successfully.');
});

//文件下载
app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    res.download(filePath, filename, (err) => {
        if (err) {
            if (!res.headersSent) res.status(err.statusCode === 404 ? 404 : 500).send(filePath + ' Oops! 文件传送出错啦.');
        }
    });
});

app.use(express.static(path.join(__dirname, 'public')));
require('./app/routes')(app); // configure our routes

// React 负责前端路由；未命中后端接口的页面请求统一回到入口文件。
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

global.sqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'pass910301',
    database: 'showbbs'
}

app.listen(3000, function () {
    console.log('listening on 3000');
});

/*
const express = require('express');
const multer = require('multer');
const app = express();
 
// 设置存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 确保这个文件夹已经存在
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
const upload = multer({ storage: storage });
 
// 单文件上传
app.post('/upload', upload.single('myFile'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully.');
});
 */
