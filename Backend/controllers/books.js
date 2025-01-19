const Books = require('../models/Books');

exports.createBooks = (req, res, next) => {
    const booksObject = JSON.parse(req.body.books);
    delete booksObject._id;
    delete booksObject._userId;
    const books = new Books({
      ...booksObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    books.save()
      .then(() => { res.status(201).json({ message: 'Objet enregistre'})})
      .catch(error => { res.status(400).json ({error})})  
}

exports.modifyBooks = (req, res, next) => {
  Books.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Objet modifie'}))
    .catch(error => res.status(400).json ({error}));
}

exports.deleteBooks = (req, res, next) => {
  Books.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.getOneBooks = (req, res, next) => {
  Books.findOne()
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
 }

exports.getAllBooks = (req, res, next) => {
  Books.find()
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({ error }));
}



