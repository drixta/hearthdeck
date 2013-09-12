var express = require("express");
var app = express();
var fs = require('fs');

// Database
var mongo = require('mongoskin');
var mongoUri = process.env.MONGOHQ_URL||'mongodb://localhost/mydb';

var db = mongo.db(mongoUri, {safe:true});


// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

app.param('decks', function(req, res, next, decks){
  req.collection = db.collection(decks)
  return next()
})

var cardFile = fs.readFileSync('./routes/cards.json','utf8');
var schema = JSON.parse(cardFile);
app.get('/api/cards', function(req,res){
	res.send(schema);
});
/* Find type of cards
app.get('/cards/minions', cards.findAllMinions);
app.get('/cards/spells', cards.findAllSpells);
app.get('/cards/equipments', cards.findAllEquipments);
app.get('/cards/:heroclass', cards.findAllClasscards);
*/
app.get('/api/:decks', function(req, res) {
  req.collection.find({},{limit:10, sort: [['_id',-1]]}).toArray(function(e, results){
    if (e) return next(e)
    res.send(results)
  })
});		
app.get('/api/:decks/:id', function(req, res) {
  req.collection.findOne({_id: req.collection.id(req.params.id)}, function(e, result){
    if (e) return next(e)
    res.send(result)
  });
 });
app.post('/api/:decks', function(req, res) {
  req.collection.insert(req.body, {}, function(e, results){
    if (e) return next(e)
    res.send(results)
  })
});
/*
app.put('/decks/:id', function(req, res) {
  req.collection.update({_id: req.collection.id(req.params.id)}, {$set:req.body}, {safe:true, multi:false}, function(e, result){
    if (e) return next(e)
    res.send((result===1)?{msg:'success'}:{msg:'error'})
  })
});
*/
app.del('/decks/:id', function(req, res) {
  req.collection.remove({_id: req.collection.id(req.params.id)}, function(e, result){
    if (e) return next(e)
    res.send((result===1)?{msg:'success'}:{msg:'error'})
  })
});
// Launch server

app.listen(process.env.PORT || 3000, function(){  //CONFIG.port
	console.log("Server running on port " + 3000);
});