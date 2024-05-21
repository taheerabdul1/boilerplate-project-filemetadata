require('dotenv').config();
var express = require('express');
var cors = require('cors');
var multer = require('multer');
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'),async (req, res) => {
  try {
    const file = req.file;
    const name = req.file.originalname;
    const type = req.file.mimetype;
    const size = req.file.size;
    res.json({
      name: name,
      size: size,
      type: type,
    })
  } catch (e) {
    console.error(e);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
