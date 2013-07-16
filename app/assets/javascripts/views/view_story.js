App.Views.ViewStory = Backbone.View.extend({
	name: 'view_story',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.model.toJSON()));
		
		for (status in App.StatusTypes) {
			this.lanes[status] = $el.find('story_' + this.model.id + '_issues_' + status);
		}
		
		this.model.children.forEach(this.addOne, this);
		
		return this.$el.html();
	},

	addOne : function(card) {
		var viewIssueView = new App.Views.ViewIssue({ 
			model : card 
		});
		
		this.lanes[model.status].append(viewIssueView.render());
	}

});