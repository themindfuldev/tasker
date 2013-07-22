App.Routers.App = Backbone.Router.extend({
	
	initialize : function(options) {
		var self = this;
		
		this.route(/^card\/(\d+)$/, 'viewCard');
		this.route(/^card\/(\d+)\/new-story$/, 'newStory');
		this.route(/^card\/(\d+)\/new-issue$/, 'newIssue');
		
		this.on('readyToRender', this.readyToRenderEvent);
		this.on('render', this.renderEvent);
		this.on('readyToAlert', this.dismissPreviousViewEvent);
	},

	routes : {
		'' : 'viewAll',
		'card/new-project' : 'newProject',
		'*path' : 'viewAll'
	},

	before : function(route, params) {
		var handler = this.routes[route];
		console.log('Navigated to ' + handler + ' route.');
		
		this.isReadyToRender = false;

		App.Alert.dismissAlerts(this.dismissPreviousView);
	},
	
	/*
	 * Routing functions
	 */
	viewAll : function() {
		var self = this,
			cardCollection = new App.Collections.Cards();

		cardCollection.fetch({
			success : function(collection, response, options) {
				var view = new App.Views.ViewAll({
					collection : collection
				});

				self.trigger('render', [view]);
			},
			error : function(collection, response, options) {
				App.Alert.alert({
					message : 'Não foi possível obter os projetos.',
					type : App.AlertTypes.error
				});
			}
		});
	},

	viewCard : function(id) {
		var self = this,
			cardModel = new App.Models.Card({
				id : id
			});

		cardModel.fetch({
			success : function(model, response, options) {
				var view = new App.Views.ViewCard({
					model : model
				});

				self.trigger('render', [view]);
			},
			error : function(collection, response, options) {
				App.Alert.alert({
					message : 'Não foi possível obter o card com id = ' + id + '.', 
					type : App.AlertTypes.error
				});
			}
		});
	},

	newProject : function() {
		var view = new App.Views.NewCard({
			type : App.CardTypes.project,
			menuItemId: 'new_project'
		});

		this.trigger('render', [view]);
	},

	newStory : function(id) {
		var view = new App.Views.NewCard({
			type : App.CardTypes.story,
			id : id,
			title: 'Nova estória',
			menuItemId: 'new_story'
		});

		this.trigger('render', [view]);
	},

	newIssue : function(id) {
		var view = new App.Views.NewCard({
			type : App.CardTypes.issue,
			id : id,
			title : 'Nova issue',
			menuItemId: 'new_issue'
		});

		this.trigger('render', [view]);
	},
	
	/*
	 * Renderization functions
	 */
	render : function(view) {
		this.currentView = view;
		
		this.selectMenu();

		// Rendering new view
		this.currentView.render();
		$('section#contents').html(this.currentView.el);
		this.currentView.$el.fadeIn();

		console.log('Rendered ' + this.currentView.name + ' view.');
	},

	selectMenu : function() {
		var menuItemId;
		
		// Re-render menu
		App.menuView.render();
		
		if (this.currentView.name === 'view_all') {
			menuItemId = this.currentView.name;
		}
		else if (this.currentView instanceof App.Views.NewCard){
			menuItemId = this.populateNewCardMenuItem(this.currentView);
		}
		
		if (menuItemId) {
			$("ul#menu li.active").removeClass('active');
			$("li#menu_" + menuItemId).addClass('active');
		}
	},
	
	populateNewCardMenuItem : function(view) {
		var menuItemModel, menuItemView;
		
		if (this.currentView.options.type !== App.CardTypes.project) {
			menuItemModel = new App.Models.MenuItem({
				name : this.currentView.options.menuItemId,
				url : '/' + Backbone.history.fragment,
				title : this.currentView.options.title
			}), 
			menuItemView = new App.Views.MenuItem({
				model : menuItemModel
			});
			
			menuItemView.render();
			$('ul#menu').append(menuItemView.el);
		}
		
		return this.currentView.options.menuItemId;
	},
	
	/*
	 * Events
	 */
	readyToRenderEvent : function(event) {
		App.Alert.renderTriggeredAlerts();
		
		if (this.nextView) {
			this.render(this.nextView);
			delete self.nextView;
		}
		else {
			this.isReadyToRender = true;
			App.Helpers.showLoading('section#contents');			
		}
	},
	
	renderEvent : function(parameters) {
		var view = parameters[0];
		
		if (this.isReadyToRender) {
			this.render(view);
			delete self.isReadyToRender;
		}
		else {
			this.nextView = view;
		}
	},
	
	dismissPreviousViewEvent : function() {
		var self = this,
			previousView = this.currentView;
		
		if (previousView) {
			previousView.$el.fadeOut({
				complete : function() {
					self.trigger('readyToRender');
					previousView.remove();
				}
			});
		}
		else {
			self.trigger('readyToRender');
		}
	}

});