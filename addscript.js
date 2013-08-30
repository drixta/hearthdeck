fs = require('fs');
var m = JSON.parse(fs.readFileSync('./routes/newcards.json').toString());
m.forEach(function(p){
	p.Picture = p.Name.toLowerCase().replace(/'.{1}|\s|\W/g,'')+".png";
});
fs.writeFile('newcards.json', JSON.stringify(m));