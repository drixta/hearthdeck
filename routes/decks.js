var mongo = require('mongoskin');

var db = mongo.db(process.env.MONGOHQ_URL);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'deckdb' database");
        db.collection('decks', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'decks' collection doesn't exist.");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving deck: ' + id);
    db.collection('decks', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('decks', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.adddeck = function(req, res) {
    var deck = req.body;
    console.log('Adding deck: ' + JSON.stringify(deck));
    db.collection('decks', function(err, collection) {
        collection.insert(deck, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updatedeck = function(req, res) {
    var id = req.params.id;
    var deck = req.body;
    delete deck._id;
    console.log('Updating deck: ' + id);
    console.log(JSON.stringify(deck));
    db.collection('decks', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, deck, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating deck: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(deck);
            }
        });
    });
}

exports.deletedeck = function(req, res) {
    var id = req.params.id;
    console.log('Deleting deck: ' + id);
    db.collection('decks', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateDB = function() {

    var decks = [
    {
        name: "MAGI",
        classname: "Mage",
        description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely wine, which makes an excellent complement to fish dishes.",
        cards: [{"Name":"Ashbringer","Rarity":"Legendary","Class":"Paladin","Mana":"5 Mana","Attack":"3","Durability":"5","Description":"No description.","Picture":"ashbringer.png"}]
    }];

    db.collection('decks', function(err, collection) {
        collection.insert(decks, {safe:true}, function(err, result) {});
    });

};