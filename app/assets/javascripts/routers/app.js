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
				console.log("Fetched cards collection = " + collection.models); 				

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

	},

	newCard : function(id) {

	}
});