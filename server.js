var express = require('express');
var app = express();
var multer = require('multer');
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'up');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post(
  '/upload',
  upload.single('file'),
  (req, res, next) => {
    const file = req.file;
    return res.status(200).send(file);
  }
  // {
  //   upload(req, res, function (err) {
  //     if (err instanceof multer.MulterError) {
  //       return res.status(500).json(err);
  //     } else if (err) {
  //       return res.status(500).json(err);
  //     }
  //     console.log(req.body.file);
  //     return res.status(200).send(req.file);
  //   });
  // }
);

app.listen(8000, function () {
  console.log('App running on port 8000');
});
