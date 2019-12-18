window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.QuickEval = window.D2L.PolymerBehaviors.QuickEval || {};

/*
* Behavior for refreshing the current href
* @polymerBehavior
*/
D2L.PolymerBehaviors.QuickEval.D2LQuickEvalRefreshBehaviorImpl = {

	created: function() {
		this._boundRefresh = this.refresh.bind(this);
	},

	attached: function() {
		window.addEventListener('d2l-quick-eval-refresh', this._boundRefresh);
	},

	detached: function() {
		window.removeEventListener('d2l-quick-eval-refresh', this._boundRefresh);
	},

	refresh: function() {
		console.log(this);
		const selfHref = this._getSelfLink(this.entity);

		if (selfHref) {
			window.D2L.Siren.EntityStore.fetch(selfHref, this.token, true).then(response => {
				this.entity = response.entity;
			});
		}
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.D2LQuickEvalRefreshBehavior = [
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.QuickEval.D2LQuickEvalRefreshBehaviorImpl
];
