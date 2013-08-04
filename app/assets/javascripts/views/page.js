App.Views.Page = Backbone.View.extend({
	name: 'page',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template());
	}
});