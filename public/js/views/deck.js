window.DeckTemplate = Backbone.View.extend({
	className: "container",
    initialize:function () {
    	this.model = new Deck();
        this.render();
    },
    events: {
        "click .save": "savedeck",
        "mouseover .classhead": "showchart"
    },

    savedeck: function(){
        var model = this.model;
        if (this.validate() == true){
            var name = $('.name', this.el).val();
            model.save({name: name, className: hero,description: "",cards:model.deck},
            {success: function(model,res){
            app.navigate("/decks/" + res[0]._id, {trigger:true});
            },
            error: function(){
            console.log("Failed miserably");
            }
            }
            )
        }
    },
    showchart: function(){
        var deck = this.model.deck;
        var manadis= [0,0,0,0,0,0,0,0];
        deck.each(function(item){
            if (item.get("Mana") >= 7){
                manadis[7]++;    
            }
            else {
                manadis[item.get("Mana")]++;
            }
            console.log(manadis);
        });
        var canvas = '<canvas id="manaChart" width="200" height="100"></canvas>';
        $(this.el).find(".classhead").popover({content:canvas, title: "Mana Distribution",trigger:"hover", placement:"left",html:true});
        $(this.el).find(".classhead").on('shown.bs.popover',function(){
            var ctx = $("#manaChart").get(0).getContext("2d");
        var data = {
            labels:["0","1","2","3","4","5","6","7"],
            datasets:[{
                fillColor : "#e67e22",
                strokeColor : "rgba(220,220,220,1)",
                data : [manadis[0],manadis[1],manadis[2],manadis[3],manadis[4],manadis[5],manadis[6],manadis[7]]
            }]
        };
        var manaChart = new Chart(ctx).Bar(data,{scaleOverlay : true, scaleShowGridLines : false,   barShowStroke : true});
        });
    },
    validate: function(){
        if (this.model.deck.length < 30){
            this.alertmessage("You need <b>30</b> cards in your deck to save");
            return false
        }
        if (!$('.name', this.el).val()){
            this.alertmessage("Please fill in the name of your deck");
            return false
        }
        if (this.model.deck.length == 30 && $('.name', this.el).val()){
            return true;
        }
    },
    alertmessage: function(messages){
        container = window.$(".top");
        container.fadeIn(0)
        alert = new Alert({message: messages});
        container.html(alert.render().el);
        setTimeout("container.fadeOut(400)",2000);
    },

    render:function () {
        var cardDeck = this.model.deck;
        $(this.el).html(this.template(this.model));
        this.showchart();
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
        deck.model.deck.remove(this.model);
        deck.render();
    }
});