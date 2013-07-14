App.Routers.App = Backbone.Router.extend({
	routes : {
		'' : 'viewAll',
		'/card/:id' : 'viewCard',
		'/card/(:id/)new' : 'newCard',
		'*path' : 'viewAll'
	},

	viewAll : function() {
		var cardCollection = new App.Collections.Cards();
		cardCollection.fetch({
			success: function(collection, response, options) {
				console.log('Fetched cards collection = ' + collection.models); 				

				var viewAllView = new App.Views.ViewAll({
					collection: collection,
					el: $('#contents')
				});
				viewAllView.render();
				console.log('Rendered view = viewAll'); 				
			},
			error : function(collection, response, options) {
				console.log('Could not fetch cards collection');
			}
		});
	},

	viewCard : function(id) {
		var cardModel = new App.Model.Card({
			id: id
		});
		cardModel.fetch({
			success: function(model, response, options) {
				console.log('Fetched card with id ' + id + ' = ' + model.model); 				

				var viewCardView = new App.Views.ViewCard({
					model: model,
					el: $('#contents')
				});
				viewCardView.render();
				console.log('Rendered view = viewCard'); 				
			},
			error : function(collection, response, options) {
				console.log('Could not fetch card with id ' + id);
			}
		});
	},

	newCard : function(id) {
		var newCardView = new App.Views.NewCard({
			id: id,
			el: $('#contents')
		});
		newCardView.render();
		console.log('Rendered view = newCard'); 				
	}
});