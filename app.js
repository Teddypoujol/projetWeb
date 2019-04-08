var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');








mongoose.connect('mongodb+srv://teddy:1234@cluster0-yvmym.mongodb.net/superheros', {useNewUrlParser: true } );
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://teddy:1234@cluster0-yvmym.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("SuperHerosApp").collection("SuperHeros");
  // perform actions on the collection object
  client.close();
});
*/

require('./models/Superhero');
require('./models/Superpouvoir');
var app = express();

app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/',require('./routes/superheros'));
app.use('/superpouvoirs',require('./routes/superpouvoirs'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

console.log('superhero lancé sur le port 3000');
app.listen(3000);