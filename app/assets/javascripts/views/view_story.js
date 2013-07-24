App.Views.ViewStory = Backbone.View.extend({
	name: 'view_story',
	lanes: {},
	
	events : {
		'click a.remove-story[data-action=delete]': 'removeStory'
	},
	
	render : function() {
		var self = this,
			template = HandlebarsCompiler.get(this.name);
		
		this.$el.html(template(this.model.toJSON()));
		
		if (this.model.attributes.children) {
			_.forEach(App.StatusTypes, function(status) {
				self.lanes[status] = self.$el.find('story_' + self.model.id + '_issues_' + status);
			});

			this.model.attributes.children.forEach(this.addOne, this);
		}
	},

	addOne : function(card) {
		var viewIssueView = new App.Views.ViewIssue({ 
			model : card 
		});
		
		this.lanes[card.status].append(viewIssueView.render());
	},
	
	removeStory : function() {
		this.model.destroy({
			success: function(model) {
				App.Alert.alert({
					message: 'Estória ' + model.attributes.title + ' removida com sucesso!',
					type: App.AlertTypes.success,
					trigger: true
				});
				Backbone.history.loadUrl(Backbone.history.fragment);
			},
			
			error: function(model) {
				App.Alert.alert({
					message : 'Houve um erro ao remover a estória ' + model.attributes.title + '.', 
					type: App.AlertTypes.error
				});
			}
		});
	}

});