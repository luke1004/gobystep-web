console.log('Starting express server...');
const express = require('express');

const multer = require('multer');

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// 设置存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 确保这个文件夹已经存在
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

app.listen(3000, function () {
    console.log('listening on 3000');
});

app.use(express.static(__dirname + '/public'));
require('./app/routes')(app); // configure our routes

sqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'pass910301',
    database: 'showbbs'
}
