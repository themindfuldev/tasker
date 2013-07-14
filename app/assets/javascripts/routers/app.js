App.Routers.App = Backbone.Router.extend({
	routes : {
		'' : 'viewAll',
		'/card/:id' : 'viewCard',
		'/card/(:id/)new' : 'newCard',
		'*path' : 'viewAll'
	},

	viewAll : function() {
		console.log('viewAll');
	},

	viewCard : function(id) {

	},

	newCard : function(id) {

	}
});