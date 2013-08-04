// Alert types are 'success', 'error' or 'info'
App.Alert = {
	alertQueue: [],
		
	alert : function(options) {
		var alertView = this.createAlert(options);
		this.renderAlert(alertView);
	},
	
	push : function(options) {
		var alertView = this.createAlert(options);
		this.alertQueue.push(alertView);
	},
	
	createAlert : function(options) {
		var alertModel = new App.Models.Alert({
				message : options.message,
				type : options.type
			}), 
			alertView = new App.Views.Alert({
				model : alertModel
			});

		return alertView;
	},
	
	renderAlert : function(alertView) {
		alertView.render();
		$('section#alert').append(alertView.el);
		App.AnimationBuffer.add(function() {
			alertView.$el.fadeIn();
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}, this);
	},
	
	displayAllAlerts : function() {
		var alertView,
			fragment = document.createDocumentFragment();
		
		while (this.alertQueue.length) {
			alertView = this.alertQueue.shift();
			alertView.render();
			fragment.appendChild(alertView.el);
		}
		
		$('section#alert').append(fragment);
	}	
	
};