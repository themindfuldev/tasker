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
					title: $.i18n.prop('status.' + value).toUpperCase()
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
				card.previous = $.i18n.prop('status.' + App.StatusTypes[currentLaneIndex - 1]); 
			}
			if (currentLaneIndex < App.StatusTypes.length - 1) {
				card.next = $.i18n.prop('status.' + App.StatusTypes[currentLaneIndex + 1]); 
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
		App.CardHelpers.remove(this);
	}

});