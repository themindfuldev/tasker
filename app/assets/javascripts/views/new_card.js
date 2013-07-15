App.Views.NewCard = Backbone.View.extend({
	name : 'new_card',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.options));
		this.$el.slideDown();
	},
	
	collapse : function() {
		this.$el.slideUp();
	},

	events: {
	  'submit': 'save',
	  'click input#cancel_button': 'cancel'
	},
	
	save: function(e) {
		e.preventDefault();
		var model = new App.Models.Card({
			title: this.$('input[name=title]').val(),
			description: this.$('input[name=description]').val(),
			assignee: this.$('input[name=assignee]').val(),
			type: 1
			//parent_id: this.$('input[name=parent_id]').val()
		});
		model.save();
	},
	
	cancel: function(e) {
		App.navigate('/');
	}
});