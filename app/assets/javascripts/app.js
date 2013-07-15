App = {
	Models : {},
	Views : {},
	Collections : {},
	Routers : {},
	
	CardTypes: {
		'project': 1,
		'story': 2,
		'issue': 3
	},

	start : function() {
		var appRouter = new App.Routers.App();
		
		// Creating navigate method
		this.navigate = function(target) {
			appRouter.navigate(target, {
				trigger : true
			});			
		};
		
		// Setting up links to routing
		$('body').on('click', 'a[data-internal]', function(e) {
			e.preventDefault();
			App.navigate(e.currentTarget.pathname);
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