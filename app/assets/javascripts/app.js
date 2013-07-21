App = new (Backbone.View.extend({
	/*
	 * App definitions
	 */
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

	/*
	 * App view setup
	 */
	name : 'app',

	events : {
		'click a[data-internal]' : function(event) {
			event.preventDefault();
			this.appRouter.navigate(event.currentTarget.pathname, { trigger : true });
		}
	},

	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template());
	},

	start : function() {
		this.appRouter = new App.Routers.App();
		
		// Starting backbone history
		Backbone.history.start({
			pushState : true
		});
	}
}))({
	el : document.body
});

$(function() {
	App.render();
	App.start();
})