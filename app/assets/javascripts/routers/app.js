App.Routers.App = Backbone.Router.extend({
	
	initialize: function(options) {
		this.route(/^card\/(\d+)$/, 'viewCard');
		this.route(/^card\/(\d+)\/new-story$/, 'newStory');
		this.route(/^card\/(\d+)\/new-issue$/, 'newIssue');
	},
	
	routes : {
		'' : 'viewAll',
		'card/new-project' : 'newProject',
		'*path' : 'viewAll'
	},

	viewAll : function() {
		var self = this,
			cardCollection = new App.Collections.Cards();
	
		App.Helpers.showLoading('section#contents');
		
		cardCollection.fetch({
			success: function(collection, response, options) {
				var view = new App.Views.ViewAll({
						collection: collection
					});
				
					self.render(view);
			},
			error : function(collection, response, options) {
				App.Helpers.alert('Não foi possível obter os projetos.', App.AlertTypes.error);
			}
		});
	},

	viewCard : function(id) {
		var self = this,
			cardModel = new App.Models.Card({
				id: id
			});
				
		cardModel.fetch({
			success: function(model, response, options) {
				var view = new App.Views.ViewCard({
						model: model						
					});
				
				self.render(view);
			},
			error : function(collection, response, options) {
				App.Helpers.alert('Não foi possível obter o card com id = ' + id + '.', App.AlertTypes.error);
			}
		});
	},

	newProject : function() {
		var view = new App.Views.NewCard({
				type: App.CardTypes.project
			});
		
		this.render(view);
	},
	
	newStory : function(id) {
		var view = new App.Views.NewCard({
				type: App.CardTypes.story,
				id: id
			});
		
		this.render(view);
	},

	newIssue : function(id) {
		var view = new App.Views.NewCard({
				type: App.CardTypes.issue,
				id: id				
			});
		
		this.render(view);
	},

	render: function(view) {
		// Removing previous view
		if (this.currentView) {
			this.currentView.$el.slideDown();
			this.currentView.remove();
		} 
		
		// Adding new view
		this.currentView = view;
		this.highlightNavbar();
		
		// Rendering new view
		this.currentView.render();		
		$('section#contents').html(this.currentView.el);

		if (this.currentView.$el.contents().length > 0) {
			this.currentView.$el.slideDown();
		}

		console.log('Rendered ' + view.name); 						
	},
	
	highlightNavbar: function() {
		$("ul#menu li").removeClass('active');
		$("li#menu_" + this.currentView.name).addClass('active');
	}
});