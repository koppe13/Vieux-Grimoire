const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const booksCtrl = require('../controllers/books');

router.get('/', auth, booksCtrl.getAllBooks);
router.post('/', auth, multer, booksCtrl.createBooks);
router.put('/:id', auth, booksCtrl.modifyBooks);
router.delete('/:id', auth, booksCtrl.deleteBooks);
router.get('/:id', auth, booksCtrl.getOneBooks);



module.exports = router;