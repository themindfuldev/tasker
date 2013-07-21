App.Routers.App = Backbone.Router.extend({
	
	initialize : function(options) {
		var self = this;
		
		this.route(/^card\/(\d+)$/, 'viewCard');
		this.route(/^card\/(\d+)\/new-story$/, 'newStory');
		this.route(/^card\/(\d+)\/new-issue$/, 'newIssue');
		
		this.on('readyToRender', function(event) {
			if (self.nextView) {
				self.render(self.nextView);
				delete self.nextView;
			}
			else {
				self.isReadyToRender = true;
			}
		});

		this.on('render', function(parameters) {
			var view = parameters[0];
			
			if (self.isReadyToRender) {
				self.render(view);
				delete self.isReadyToRender;
			}
			else {
				self.nextView = view;
			}
		});
	},

	routes : {
		'' : 'viewAll',
		'card/new-project' : 'newProject',
		'*path' : 'viewAll'
	},

	before : function(route, params) {
		var handler = this.routes[route],
			previousView = this.currentView,
			self = this;
		
		console.log('Navigated to ' + handler + ' route.');
		
		if (previousView) {
			App.Helpers.dismissAlerts();

			previousView.$el.fadeOut({
				complete : function() {
					previousView.remove();
					self.trigger('readyToRender');
					//App.Helpers.showLoading('section#contents');
				}
			});
		}
		else {
			this.trigger('readyToRender');
		}
	},

	viewAll : function() {
		var self = this, cardCollection = new App.Collections.Cards();

		cardCollection.fetch({
			success : function(collection, response, options) {
				var view = new App.Views.ViewAll({
					collection : collection
				});

				self.trigger('render', [view]);
			},
			error : function(collection, response, options) {
				App.Helpers.alert('Não foi possível obter os projetos.',
						App.AlertTypes.error);
			}
		});
	},

	viewCard : function(id) {
		var self = this, cardModel = new App.Models.Card({
			id : id
		});

		cardModel.fetch({
			success : function(model, response, options) {
				var view = new App.Views.ViewCard({
					model : model
				});

				self.trigger('render', [view]);
			},
			error : function(collection, response, options) {
				App.Helpers.alert('Não foi possível obter o card com id = '
						+ id + '.', App.AlertTypes.error);
			}
		});
	},

	newProject : function() {
		var view = new App.Views.NewCard({
			type : App.CardTypes.project
		});

		this.trigger('render', [view]);
	},

	newStory : function(id) {
		var view = new App.Views.NewCard({
			type : App.CardTypes.story,
			id : id
		});

		this.trigger('render', [view]);
	},

	newIssue : function(id) {
		var view = new App.Views.NewCard({
			type : App.CardTypes.issue,
			id : id
		});

		this.trigger('render', [view]);
	},

	render : function(view) {
		this.currentView = view;
		
		this.highlightNavbar();

		// Rendering new view
		this.currentView.render();
		$('section#contents').html(this.currentView.el);
		this.currentView.$el.fadeIn();

		console.log('Rendered ' + this.currentView.name + ' view.');
	},

	highlightNavbar : function() {
		$("ul#menu li").removeClass('active');
		$("li#menu_" + this.currentView.name).addClass('active');
	}
});