var express = require("express");
var app = express();
// Database


// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});


cards = require('./routes/cards');
app.get('/cards', cards.findAll);
/* Find type of cards
app.get('/cards/minions', cards.findAllMinions);
app.get('/cards/spells', cards.findAllSpells);
app.get('/cards/equipments', cards.findAllEquipments);
app.get('/cards/:heroclass', cards.findAllClasscards);
*/

decks = require('./routes/decks');
app.get('/decks', decks.findAll);
app.get('/decks/:id', decks.findById);
app.post('/decks', decks.adddeck);
app.put('/decks/:id', decks.updatedeck);
app.delete('/decks/:id', decks.deletedeck);
// Launch server

app.listen(process.env.PORT || CONFIG.port, function(){  //CONFIG.port
	console.log("Server running on port " + 3000);
});