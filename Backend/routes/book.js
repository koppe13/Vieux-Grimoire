const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.post('/', (req, res, next) => {
    delete req.body._id;
    const book = new Book({
      ...req.body
    });
    book.save()
      .then(() => res.status(201).json({ message: 'Objet enregistre'}))
      .catch(error => res.status(400).json ({error}))
  
});

router.use((req, res, next) => {
  res.status(201);
  next();
});

router.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

router.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = router;