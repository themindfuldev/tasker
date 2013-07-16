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
		var model, data;
		
		e.preventDefault();

		model = new App.Models.Card();
		data = {
			title: this.$('input[name=title]').val(),
			description: this.$('input[name=description]').val(),
			assignee: this.$('input[name=assignee]').val(),
			type: this.options.type
			//parent_id: this.$('input[name=parent_id]').val()
		};

		model.save(data, {
			success: function(model, response, options) {
				App.navigate('/');
			},
			
			error: function(model, response, options) {
			
			}
		});
	},
	
	cancel: function(e) {
		App.navigate('/');
	}
});