App.Views.ViewStory = Backbone.View.extend({
	name: 'view_story',
	lanes: {},
	
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
	}

});