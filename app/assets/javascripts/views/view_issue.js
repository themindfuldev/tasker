App.Views.ViewIssue = Backbone.View.extend({
	name: 'view_issue',
	tagName: 'article',
	className: 'issue',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.model.toJSON()));
	}
});