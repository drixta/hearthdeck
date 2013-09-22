window.DeckView = Backbone.View.extend({
    initialize:function () {
        this.render();
        console.log(this.model);
    },

    render:function () {
        var self=this;
        $(this.el).html(this.template(this.model.toJSON()));
        console.log(this.model.attributes);
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
window.DeckItem = Backbone.View.extend({
    render: function () {
        console.log(this.model.toJSON().Picture);
        img = '<img width="198" src="picture/'+this.model.toJSON().Picture+ '">';
        $(this.el).html(this.template(this.model.toJSON()));
        $(this.el).find(".label").popover({content:img, html:true, trigger:'hover'});
        return this;
    },
    twocards: function(){
        $('.label',this.el).append(" x2");
        return this;
    }    
})