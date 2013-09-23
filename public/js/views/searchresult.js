window.SearchResult = Backbone.View.extend({
	className: "searchresult",
    initialize:function () {
        this.render();
    },

    render: function () {
    	var that = this;
        $(this.el).html(this.template(this.model));
        this.model.each(function(item){
        	console.log(item);
        	$(".decklist",that.el).append(new SearchResultItem({model:item}).render().el)
        });
        return this;
    }
});
window.SearchResultItem = Backbone.View.extend({
	className: "searchresultitem",
    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});