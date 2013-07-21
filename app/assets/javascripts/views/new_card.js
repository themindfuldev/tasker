App.Views.NewCard = Backbone.View.extend({
	name : 'new_card',
	className: 'start-collapsed',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.options));
	},
	
	events: {
	  'submit': 'save',
	  'click input#cancel_button': 'cancel'
	},
	
	save: function(event) {
		var model, data;
		
		event.preventDefault();

		model = new App.Models.Card();
		data = {
			title: this.$('input[name=title]').val(),
			description: this.$('input[name=description]').val(),
			assignee: this.$('input[name=assignee]').val(),
			type: this.options.type,
			parentId: this.$('input[name=parent_id]').val()
		};

		model.save(data, {
			success: function(model, response, options) {
				App.Helpers.alert('Card ' + model.attributes.title + ' criado com sucesso!', 'success');
				App.navigate('/');
			},
			
			error: function(model, response, options) {
				App.Helpers.alert('Houve um erro ao criar o card!', 'error');
			}
		});
	},
	
	cancel: function(event) {
		event.preventDefault();
		
		App.navigate('/');
	}
});