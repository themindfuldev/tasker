App = {
	Models : {},
	Views : {},
	Collections : {},
	Routers : {},
	RoutersCache : {},

	start : function() {
		App.RoutersCache.appRouter = new App.Routers.App();
		Backbone.history.start({
			pushState : true
		});

		// Setting up links to routing
		$('body').on('click', 'a', function(e) {
			e.preventDefault();
			App.RoutersCache.appRouter.navigate(e.currentTarget.pathname, {
				trigger : true
			});
		});
	}
}

$(function() {	
	App.start();
})