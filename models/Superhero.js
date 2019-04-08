var mongoose = require('mongoose');

var superheroSchema = new mongoose.Schema({
    name: String,
    number: Number,
    description: String,
    picture: String,
    superpouvoirs: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Superpouvoir'
    }
    ]

});

var Superhero = mongoose.model('Superhero',superheroSchema);

module.exports = Superhero;