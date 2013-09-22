window.DeckTemplate = Backbone.View.extend({
	className: "container",
    initialize:function () {
    	this.model = new Deck();
        this.render();
    },
    events: {
        "click .save": "savedeck",
    },

    savedeck: function(){
        var model = this.model
        var name = $('.name', this.el).val();
        console.log("trying to save");
        model.save({name: name, className: hero,description: "",cards:model.deck},
            {success: function(model,res){
            console.log("Saved");
            console.log("Response",res[0]);
            console.log(model.id);
            app.navigate("/decks/" + res[0]._id, {trigger:true});
            },
            error: function(){
            console.log("Failed miserably");
            }
            }
        )
    },


    render:function () {
        var cardDeck = this.model.deck;
        $(this.el).html(this.template());
        cardDeck.comparator = function (card){
            return card.get("Mana");
        };
        var doubles = {};
        cardDeck.each(function(item){
            var name = item.get("Name");
            if (cardDeck.where({Name: name}).length == 2) {
                if (!doubles[name]){
                    $('.deck', this.el).append(new DeckItemTemplate({model: item}).render().twocards().el);
                    doubles[name] = "1";
                    console.log(item);
                }
            }
            else{
            $('.deck', this.el).append(new DeckItemTemplate({model: item}).render().el);
            }
        });
        return this;
    }

});

window.DeckItemTemplate = DeckItem.extend({
    className: "removable",
    events: {
        "click .label": "removecard"
    },
	removecard: function(){
        console.log(this.model);
        deck.model.deck.remove(this.model);
        deck.render();
    }
}); 

$(".label").popover({title: "test", html:true});