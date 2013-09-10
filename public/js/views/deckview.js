window.DeckView = Backbone.View.extend({
    initialize:function () {
        this.render();
    },

    render:function () {
        var self=this;
        $(this.el).html(this.template(this.model.toJSON()));
        console.log(this.model.attributes.cards);
        var doubles = {};
        deckcollection = new Backbone.Collection(this.model.attributes.cards);
        deckcollection.each(function(item){
            var name = item.get("Name");
            if (deckcollection.where({Name: name}).length == 2) {
                if (!doubles[name]){
                    $('.deck', self.el).append(new DeckItem({model: item}).render().twocards().el);
                    doubles[name] = "1";
                    console.log("I also tried");
                }
            }
            else{
            $('.deck', self.el).append(new DeckItem({model: item}).render().el);
            console.log("I did try");
            console.log(this.el);
            }
        });

    }

});