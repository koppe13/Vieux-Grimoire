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
    const booksObject = JSON.parse(req.body.book).split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, booksObject.title + req.auth.userId + Date.now() + '.' + extension);
  },
  limit:{
    fieldsize: 1 * 1024 *1024,
  } 
    
});

module.exports = multer({storage: storage}).single('image');