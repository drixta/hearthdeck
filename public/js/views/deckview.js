window.DeckView = Backbone.View.extend({
    initialize:function () {
        this.render();
    },

    render:function () {
        var self=this;
        $(this.el).html(this.template(this.model.toJSON()));
        var doubles = {};
        deckcollection = new Backbone.Collection(this.model.attributes.cards);
        deckcollection.each(function(item){
            var name = item.get("Name");
            if (deckcollection.where({Name: name}).length == 2) {
                if (!doubles[name]){
                    $('.deck', self.el).append(new DeckItem({model: item}).render().twocards().el);
                    doubles[name] = "1";
                }
            }
            else{
            $('.deck', self.el).append(new DeckItem({model: item}).render().el);
            }
        });

    }
});
window.DeckItem = Backbone.View.extend({
    render: function () {
        img = '<img width="198" src="picture/'+this.model.toJSON().Picture+ '">';
        $(this.el).html(this.template(this.model.toJSON()));
        if (this.model.get("Mana") > 9){
            $('.manaitem',this.el).css("margin-left","0.2em");
        }
        $(this.el).find(".deckitem").popover({content:img, html:true, trigger:'hover'});
        return this;
    },
    twocards: function(){
        $('.deckitem',this.el).css("background-image","url('../picture/widgets/deckcard2.gif')");
        return this;
    }    
})