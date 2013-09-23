window.SearchDeck = Backbone.View.extend({
	className: "jumbotron searchdeck",
    initialize:function () {
        this.render();
        _.compile = function(templ) {
    		var compiled = this.template(templ);
      		compiled.render = function(ctx) {
        		return this(ctx);
      		}
      		return compiled;
   		},
        $('#typeahead',this.el).typeahead({
        	name : 'decks',
        	remote: '/ajax/decks?q=%QUERY',
			template: "<p style='float:left;display:inline-block'><%= name %></p><p style='float: right;display:inline-block;font-style:italic;font-size:12px;'><%= className%></p>",
			valueKey: 'name',
			minLength: 2,
			engine: _
  		});
  		$('#typeahead',this.el).bind('typeahead:selected', function(obj, datum){
  			window.location="/#decks/"+ datum._id;
  		});
    },
    events: {
    	'keypress form': 'submit',
    },
    submit: function(e){
      if (e.keyCode != 13) return;
      app.navigate("/search?q="+$('#typeahead',this.el).val());
    },
    render:function () {
        $(this.el).html(this.template());
        return this;
    }
});