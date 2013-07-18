App.Views.ViewProject = Backbone.View.extend({
	name: 'view_project',
	
	events : {
		'click a[data-action=delete]': 'remove'
	},
	
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
	},
	
	remove : function() {
		this.model.remove({
			success: function(model, response, options) {
				App.Helpers.alert('Card ' + model.attributes.title + ' removido com sucesso!', 'success');
			},
			
			error: function(model, response, options) {
				App.Helpers.alert('Houve um erro ao remover o card!', 'error');
			}
		});
	}


});