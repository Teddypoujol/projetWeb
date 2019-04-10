
var router = require('express').Router();
var Superhero = require('./../models/Superhero');
var Superpouvoir = require('./../models/Superpouvoir');



router.get('/',(req,res) => {
    Superhero.find({}).populate('superpouvoirs').then(superheros => {
      res.render('superheros/index.html', {superheros: superheros}) ;
    });
});

router.get('/new', (req, res)=> {
	Superpouvoir.find({}).then(superpouvoirs => {
		var superhero = new Superhero();
		res.render('superheros/edit.html', {superhero: superhero , superpouvoirs: superpouvoirs, endpoint: '/'});
		})
});

router.get('/edit/:id', (req, res)=> {
	Superpouvoir.find({}).then(superpouvoirs => {
		Superhero.findById(req.params.id).then( superhero => {
			res.render('superheros/edit.html', {superhero: superhero, superpouvoirs: superpouvoirs, endpoint: '/' + superhero._id.toString() });
		});
	});
});

router.get('/delete/:id', (req , res) => {
	Superhero.findOneAndRemove({_id:req.params.id}).then(() => {
		 res.redirect('/');
	});
});

router.get('/:id', (req, res)=> {
	Superhero.findById(req.params.id).populate('superpouvoirs').then(superhero => {
		res.render('superheros/show.html', {superhero: superhero});
	},
	err => res.status(500).send(err));
});



router.post('/:id?', (req, res) => {
	new Promise((resolve, reject) => {
		if(req.params.id){
			Superhero.findById(req.params.id).then(resolve, reject);
		}
		else{
			resolve(new Superhero())
		}
	}).then(superhero => {
		superhero.name = req.body.name;
		superhero.number = req.body.number;
		superhero.description = req.body.description;
		superhero.superpouvoirs = req.body.superpouvoirs;

		if(req.file) superhero.picture = req.file.filename;

		return superhero.save();
	}).then(() => {
		res.redirect('/');
	});
});


module.exports = router;