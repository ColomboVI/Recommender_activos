const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
app.use(
  multer({
    storage,
  }).single('file')
);

app.post('/upload', (req, res) => {
  res.send(req.file);
});

app.listen(8000, function () {
  console.log('main js listen on port 8000');
});
