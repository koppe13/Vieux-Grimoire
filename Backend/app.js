const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const userRoutes = require('./routes/user'); 
const bookRoutes = require ('./routes/book');




mongoose.connect('mongodb+srv://phenixairsoft2:Babylon1974@koppe.hui2h.mongodb.net/?retryWrites=true&w=majority&appName=koppe',
   { useNewUrlParser: true,
     useUnifiedTopology: true })
   .then(() => console.log('Connexion à MongoDB réussie !'))
   .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

 app.use(bodyParser.json());

 app.use('/api/book', bookRoutes);
 app.use('/api/auth', userRoutes);

module.exports = app;