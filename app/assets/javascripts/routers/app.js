App.Routers.App = Backbone.Router.extend({
	routes : {
		'' : 'viewAll',
		'card/:id' : 'viewCard',
		'card/:id/new' : 'newCard',
		'*path' : 'viewAll'
	},

	viewAll : function() {
		var self = this,
			cardCollection = new App.Collections.Cards();
		
		cardCollection.fetch({
			success: function(collection, response, options) {
				var view = new App.Views.ViewAll({
						collection: collection,
						el: $('section#contents')
					});
				
				self.render(view);
			},
			error : function(collection, response, options) {
				console.log('Could not fetch cards collection');
			}
		});
	},

	viewCard : function(id) {
		var self = this,
			cardModel = new App.Model.Card({
				id: id
			});
		
		cardModel.fetch({
			success: function(model, response, options) {
				var view = new App.Views.ViewCard({
						model: model,
						el: $('section#overlay')
					});
				
				self.render(view);
			},
			error : function(collection, response, options) {
				console.log('Could not fetch card with id ' + id);
			}
		});
	},

	newCard : function(id) {
		var view = new App.Views.NewCard({
				id: id,
				el: $('section#overlay')
			});
		
		this.render(view);
	},
	
	render: function(view) {
		if (this.currentView) {
			if (this.currentView.collapse) {
				this.currentView.collapse();
			}
			this.currentView.$el.html();
			this.currentView.stopListening();
		} 
		this.currentView = view;
		
		$("ul#menu li").removeClass('active');
		$("li#menu_" + view.name).addClass('active');
		view.render();

		console.log('Rendered ' + view.name); 						
	}
});