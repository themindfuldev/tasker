App = {
	Models : {},
	Views : {},
	Collections : {},
	Routers : {},

	start : function() {
		var appRouter = new App.Routers.App();
		
		// Setting up links to routing
		$('body').on('click', 'a[data-internal]', function(e) {
			e.preventDefault();
			appRouter.navigate(e.currentTarget.pathname, {
				trigger : true
			});
		});
		
		// Starting backbone history
		Backbone.history.start({
			pushState : true
		});
	}
}

$(function() {	
	App.start();
})