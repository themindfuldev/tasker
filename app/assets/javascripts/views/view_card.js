App.Views.ViewCard = Backbone.View.extend({
	name: 'view_card',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template());
		return this.$el;
	}
});