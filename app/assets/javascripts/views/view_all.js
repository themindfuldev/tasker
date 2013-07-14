App.Views.ViewAll = Backbone.View.extend({
	name: 'view_all',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template());
	}

});