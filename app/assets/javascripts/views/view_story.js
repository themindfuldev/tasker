App.Views.ViewStory = Backbone.View.extend({
	name: 'view_story',
	lanes: {},
	tagName: 'article',
	className: 'story',
	
	events : {
		'click a.remove-story[data-action=delete]': 'removeStory'
	},
	
	render : function() {
		var self = this,
			template = HandlebarsCompiler.get(this.name);
		
		this.$el.html(template(this.model.toJSON()));
		
		if (this.model.attributes.children) {
			_.each(App.StatusTypes, function(value) {
				var model = new App.Models.Lane({
					title: value.toUpperCase().replace('_', ' ')
				});
				
				self.lanes[value] = new App.Views.Lane({
					model: model
				});
				self.lanes[value].render();
			});

			this.model.attributes.children.forEach(this.addOne, this);
		}
		
		$.each(this.lanes, function(key, value) {
			self.$el.find('#story_' + self.model.id + '_issues tr').append(value.el);	
		});		 
	},

	addOne : function(card) {
		var issueModel, viewIssueView, 
			currentLane = card.status.toLowerCase(),
			currentLaneIndex = App.StatusTypes.indexOf(currentLane);
		
		// Adding previous/next
		if (card.status !== 'SIGNED_OFF') {
			if (currentLaneIndex > 0) {
				card.previous = App.StatusTypes[currentLaneIndex - 1].replace('_', ' '); 
			}
			if (currentLaneIndex < App.StatusTypes.length - 1) {
				card.next = App.StatusTypes[currentLaneIndex + 1].replace('_', ' '); 
			}
		}
		
		// Populating card
		issueModel = new App.Models.Card({});
		issueModel.attributes = card;
		issueModel.id = card.id;
		
		// Rendering
		viewIssueView = new App.Views.ViewIssue({ 
			model : issueModel 
		});
		viewIssueView.render();
		
		this.lanes[currentLane].$el.append(viewIssueView.el);
	},
	
	removeStory : function() {
		var self = this;
		
		this.model.destroy({
			success: function(model) {
				App.Alert.alert({
					message: 'Story ' + model.attributes.title + ' removida com sucesso!',
					type: 'success',
					trigger: true
				});

				self.$el.fadeOut({
					complete: function() {
						self.remove();		
					}
				});				
			},
			
			error: function(model) {
				App.Alert.alert({
					message : 'Houve um erro ao remover a story ' + model.attributes.title + '.', 
					type: 'error'
				});
			}
		});
	}

});