App.Views.ViewProject = Backbone.View.extend({
	name: 'view_project',
	tagName: 'article',
	className: 'project',
	
	events : {
		'click a.remove-project[data-action=delete]': 'removeProject'
	},
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name),
			children = this.model.get('children');
		
		this.$el.html(template(this.model.toJSON()));
		
		this.containerFragment = document.createDocumentFragment();
		
		if (children) {
			children.forEach(this.addOne, this);
		}
		
		this.$el.find('#project_' + this.model.id + '_stories').append(this.containerFragment);
	},

	addOne : function(card) {
		var storyModel, viewStoryView;
		
		storyModel = new App.Models.Card({});
		storyModel.attributes = card;
		storyModel.id = card.id;
	
		viewStoryView = new App.Views.ViewStory({ 
			model : storyModel
		});
		viewStoryView.render();
		this.containerFragment.appendChild(viewStoryView.el);
	},
	
	removeProject : function() {
		App.CardHelpers.remove(this);
	}

});