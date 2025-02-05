const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const imageUpload = (req, res, next) => {
  upload.single('image')(req, res, async () => {
    const resized = await sharp(req.file.buffer)
    .resize(500,500)
    .jpeg({ quality: 80 })
    .toBuffer()

    const extension = MIME_TYPES[req.file.mimetype];
    const booksObject = JSON.parse(req.body.book);
    const fileName = booksObject.title.split(' ').join('_') + req.auth.userId + Date.now() + '.' + extension;
    const outPutPath = path.join(__dirname, '../images', fileName);

    fs.writeFileSync(outPutPath, resized);

    req.file.path = outPutPath;
    req.file.filename = fileName;

    next();
  })
  
}

module.exports = imageUpload