App = {
	Models : {},
	Views : {},
	Collections : {},
	Routers : {},

	CardTypes : {
		'project' : 0,
		'story' : 1,
		'issue' : 2
	},

	StatusTypes : {
		'backlog' : 'BACKLOG',
		'inProgress' : 'IN_PROGRESS',
		'verify' : 'VERIFY',
		'signedOff' : 'SIGNED_OFF'
	},

	AlertTypes : {
		'success' : 'success',
		'error' : 'error',
		'info' : 'info'
	},
	
	alertQueue : [],

	start : function() {
		var appRouter = new App.Routers.App();

		// Creating navigate method
		this.navigate = function(target) {
			appRouter.navigate(target, {
				trigger : true
			});
		};

		// Setting up links to routing
		$('body').on('click', 'a[data-internal]', function(event) {
			event.preventDefault();
			App.navigate(event.currentTarget.pathname);
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