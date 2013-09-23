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
      var that = this;
      if (e.keyCode != 13) return;
      var query = $('#typeahead',this.el).val();
      var deck = $.get("/ajax/decks?q=" + query, function(data){
        if (data==0){
          that.alertmessage("There is no deck in the database with that <b>Name</b>");
        }
        else {
          app.navigate("/search?q="+query,{trigger:true});
        }
      });
    },
    alertmessage: function(messages){
        container = window.$(".top");
        container.fadeIn(0)
        alert = new Alert({message: messages});
        container.html(alert.render().el);
        setTimeout("container.fadeOut(400)",2000);
    },
    render:function () {
        $(this.el).html(this.template());
        return this;
    }
});