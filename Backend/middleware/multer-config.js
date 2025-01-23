const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const booksObject = JSON.parse(req.body.book);
    const extension = MIME_TYPES[file.mimetype];
    callback(null, booksObject.title.split(' ').join('_') + req.auth.userId + Date.now() + '.' + extension);
  },
  
    
});

module.exports = multer({storage: storage}).single('image');