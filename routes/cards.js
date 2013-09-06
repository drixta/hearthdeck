var fs = require('fs');
var cardFile = fs.readFileSync('./routes/cards.json','utf8');
var schema = JSON.parse(cardFile);

exports.findAll = function(req,res){
	res.send(schema);
};
/*exports.findAllMinions = function(req,res){
	var minions = [];
	$.each(schema, function(index,value){
		if (value === "HP")){
			minions.push(value);
	});
	res.send(minions);
};
exports.findAllSpells = function(req,res){
	var spells = [];
	for (i =0; i < schema.length; i++){
		if (!schema[i].hasOwnProperty("HP") && !schema[i].hasOwnProperty("Durability")){
			spells.push(schema[i]);
		}
	}
	res.send(spells);
};

exports.findAllEquipments = function(req,res){
	var equipments = [];
	for (i =0; i < schema.length; i++){
		if (schema[i].hasOwnProperty("Durability")){
			equipments.push(schema[i]);
		}
	}
	res.send(equipments);
};
*/
exports.findAllClasscards = function(req,res){
	var heroclass =[];
	classname = req.params.heroclass
	for (i = 0; i < schema.length; i++){
		if ((schema[i]["Class"].toLowerCase() == classname.toLowerCase()) || schema[i]["Class"].toLowerCase() == "any"){
			heroclass.push(schema[i]);
		}
	}
	res.send(heroclass);
};