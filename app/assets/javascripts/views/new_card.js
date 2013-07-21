App.Views.NewCard = Backbone.View.extend({
	name : 'new_card',
	className : 'start-collapsed',

	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.options));
	},

	events : {
		'submit' : 'save',
		'click input#cancel_button' : 'cancel'
	},

	save : function(event) {
		var model, data;

		event.preventDefault();

		model = new App.Models.Card();
		data = {
			title : this.$('input[name=title]').val(),
			description : this.$('input[name=description]').val(),
			assignee : this.$('input[name=assignee]').val(),
			type : this.options.type,
			parentId : this.$('input[name=parent_id]').val()
		};

		model.save(data, {
			success : function(model, response, options) {
				App.Alert.alert({
					message : 'Card ' + model.attributes.title + ' criado com sucesso!',
					type : App.AlertTypes.success,
					trigger : true
				});
				App.appRouter.navigate('/', { trigger : true });
			},

			error : function(model, response, options) {
				App.Alert.alert({
					message : 'Houve um erro ao criar o card!',
					type : App.AlertTypes.error
				});
			}
		});
	},

	cancel : function(event) {
		event.preventDefault();

		App.appRouter.navigate('/', { trigger : true });
	}
});