App.Views.ViewProject = Backbone.View.extend({
	name: 'view_project',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.model.toJSON()));
		
		if (this.model.children) {
			this.model.children.forEach(this.addOne, this);
		}
		
		return this.$el.html();
	},

	addOne : function(card) {
		var viewStoryView = new App.Views.ViewStory({ 
			model : card 
		});
		this.$el.append(viewStoryView.render());
	}


});