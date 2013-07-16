App.Views.ViewProject = Backbone.View.extend({
	name: 'view_project',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.model.toJSON()));
		return this.$el;
	}

});