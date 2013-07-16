App.Views.ViewIssue = Backbone.View.extend({
	name: 'view_issue',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.model.toJSON()));
		return this.$el.html();
	}
});