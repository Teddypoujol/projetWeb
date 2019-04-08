var mongoose = require('mongoose');

var superpouvoirSchema = new mongoose.Schema({
    name: String,
    color: {
        type : String,
        default: 'red'
    }
});

superpouvoirSchema.virtual('superheros',{
    ref:'Superhero',
    localField:'_id',
    foreignField: 'superpouvoirs'
});


var Superpouvoir = mongoose.model('Superpouvoir',superpouvoirSchema);

module.exports = Superpouvoir;