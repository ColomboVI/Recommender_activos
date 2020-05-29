var express = require('express');
var multer = require('multer');
var upload = multer({ dest: './public' });

var app = express();

var cors = require('cors');

app.use(cors());

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now());
//   },
// });

// var upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res, next) {
  console.log(req.file, req.body);
  return res.status(200).send(req.file);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.listen(8000, function () {
  console.log('listen on port  8000');
});
