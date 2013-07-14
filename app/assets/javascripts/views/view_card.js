App.Views.ViewCard = Backbone.View.extend({
	name: 'view_card',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template());
		this.$el.slideDown();
	},

	collapse : function() {
		this.$el.slideUp();
	}

});