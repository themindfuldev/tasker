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
						collection: collection
					}),
					element = $('section#contents');
				
				self.render(view, element);
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
						model: model
					}),
					element = $('section#overlay');
				
				self.render(view, element);
				element.slideDown();
			},
			error : function(collection, response, options) {
				console.log('Could not fetch card with id ' + id);
			}
		});
	},

	newCard : function(id) {
		var view = new App.Views.NewCard({
				id: id
			}),
			element = $('section#overlay');
		
		this.render(view, element);
		element.slideDown();
	},
	
	render: function(view, element) {
		if (this.currentView) {
			var overlayElement = $('section#overlay');
			if (overlayElement.css('display') !== 'none') {
				$('section#overlay').slideUp();
			}
			
			this.currentView.remove();
		} 
		this.currentView = view;
		
		$("ul#menu li").removeClass('active');
		$("li#menu_" + view.name).addClass('active');
		element.html(view.render());

		console.log('Rendered ' + view.name); 						
	}
});