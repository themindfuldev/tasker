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
		var model, data, parentId,
			self = this;

		event.preventDefault();
		this.cleanErrors();

		model = new App.Models.Card();
		data = {
			title : this.$('input[name=title]').val(),
			description : this.$('input[name=description]').val(),
			assignee : this.$('input[name=assignee]').val(),
			type : this.options.type,
			parentId : this.$('input[name=parent_id]').val()			
		};
		
		model.on('invalid', this.processErrors, this);
		
		model.save(data, {
			success : function(model, response, options) {
				App.Alert.alert({
					message : self.options.type.toLowerCase() + ' ' + model.attributes.title + ' criado com sucesso!',
					type : 'success',
					trigger : true
				});
				App.appRouter.navigate('/', { trigger : true });
			},

			error : function(model, xhr, options) {
				App.Alert.alert({
					message : 'Houve um erro ao criar o ' + self.options.type.toLowerCase() + '!',
					type : 'error'
				});
			}
		});
	},

	cancel : function(event) {
		event.preventDefault();

		App.appRouter.navigate('/', { trigger : true });
	},
	
	cleanErrors : function() {
		this.$el.find('.error-message').text('');
		this.$el.find('input[type=text]').removeClass('error');
	},
	
	processErrors : function(model, errors) {
		_.each(errors, function(error) {
			var errorMessage = '<i class="icon-remove-sign"></i> ' + error.message; 
			
	        this.$el.find('#' + error.name + '-error-message').html(errorMessage);
	        this.$el.find('input[name=' + error.name + ']').addClass('error');
	    }, this);
	}
});