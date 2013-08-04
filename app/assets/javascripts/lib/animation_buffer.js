App.AnimationBuffer = {
	queue : [],

	add : function(fn, self, callback) {
		this.queue.push({
			fn: fn,
			self: self,
			callback: callback				
		});
		
		if (this.queue.length === 1) {
			this.next();
		}
	},
	
	next : function() {
		var nextAnimation = this.queue.shift(),
			self = this;

		if (nextAnimation) {
			nextAnimation.fn.call(nextAnimation.self, {
				complete: function() {
					if (nextAnimation.callback) {
						nextAnimation.callback.call(nextAnimation.self);
					}
					self.next();
				}
			});
		}
	}
	
};