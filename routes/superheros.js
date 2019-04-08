
var router = require('express').Router();
var Superhero = require('./../models/Superhero');
var Superpouvoir = require('./../models/Superpouvoir');


router.get('/',(req,res) => {
    Superhero.find({}).populate('superpouvoirs').then(superheros => {
      res.render('superheros/index.html', {superheros: superheros}) ;
    });
});

router.get('/:id', (req, res)=> {
	Superhero.findById(req.params.id).populate('superpouvoirs').then(superhero => {
		res.render('superheros/show.html', {superhero: superhero});
	},
	err => res.status(500).send(err));
});
module.exports = router;