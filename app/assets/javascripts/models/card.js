App.Models.Card = Backbone.Model.extend({
	urlRoot : '/api/cards',
	validate : function(attrs) {
		var errors = [];

	    if (!attrs.title) {
	        errors.push({name: 'title', message: $.i18n.prop('message.mandatory_field')});
	    }
	    if (!attrs.description) {
	        errors.push({name: 'description', message: $.i18n.prop('message.mandatory_field')});
	    }
	    if (!attrs.assignee) {
	        errors.push({name: 'assignee', message: $.i18n.prop('message.mandatory_field')});
	    }

	    return errors.length > 0 ? errors : false;
	}
});
