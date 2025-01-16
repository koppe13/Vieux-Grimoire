const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    rating: [
        { userId: string, required: true },
        { grade: Number, required: true }],
    averageRating: { type:Number }
});

module.exports = mongoose.model('book', bookSchema);