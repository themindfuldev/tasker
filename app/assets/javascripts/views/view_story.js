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
			template = HandlebarsCompiler.get(this.name),
			children = this.model.get('children');
		
		this.$el.html(template(this.model.toJSON()));
		
		if (children) {
			_.each(App.StatusTypes, function(value) {
				var model = new App.Models.Lane({
					title: $.i18n.prop('status.' + value).toUpperCase()
				});
				
				self.lanes[value] = new App.Views.Lane({
					model: model,
					lane: value
				});
				self.lanes[value].render();
			});

			children.forEach(this.addOne, this);
		}
		
		$.each(this.lanes, function(key, value) {
			self.$el.find('#story_' + self.model.id + '_issues tr').append(value.el);	
		});		 
	},

	addOne : function(card) {
		var currentLane = card.status.toLowerCase(),
			viewIssueView = new App.Views.ViewIssue({ 
				model : new App.Models.Card(card),
				parentView : this
			});
		
		viewIssueView.render();
		this.lanes[currentLane].$el.append(viewIssueView.el);
	},
	
	removeStory : function() {
		App.CardHelpers.remove(this);
	}

});