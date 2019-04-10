var router = require('express').Router();
var Superpouvoir = require('./../models/Superpouvoir');

router.get('/:superpouvoir', (req, res) => {
    Superpouvoir.findOne( {name: req.params.superpouvoir}).populate("superheros").then(superpouvoir => {
        if(!superpouvoir) return res.status(404).send("Le type n'existe pas ! attention aux majuscules")
        res.render("superpouvoirs/show.html",{
            superpouvoir: superpouvoir,
            superheros: superpouvoir.superheros
        });
            

    });
});

module.exports = router;