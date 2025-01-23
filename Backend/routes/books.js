const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const booksCtrl = require('../controllers/books');

router.get('/', booksCtrl.getAllBooks);
router.post('/', auth, multer, booksCtrl.createBooks);
router.post('/:id/rating', auth, booksCtrl.notationBooks);
router.put('/:id', auth, multer, booksCtrl.modifyBooks);
router.delete('/:id', auth, booksCtrl.deleteBooks);
router.get('/:id', booksCtrl.getOneBooks);

module.exports = router;