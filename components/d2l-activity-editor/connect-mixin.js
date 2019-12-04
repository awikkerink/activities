import { RequesterMixin } from './instance-requester-mixin.js';

export const connect = superclass => class extends RequesterMixin(superclass) {

	connectedCallback() {
		super.connectedCallback();
		const store = this.requestInstance('activity-store');
		store.addReducers(this._reducers);
		this._unsubscribeFromStore = store.subscribe(() => {
			const newProps = this._mapStateToProps(store.getState());
			Object.assign(this, newProps);
		});

		const dispatches = this._mapDispatchToProps(store.dispatch);
		Object.assign(this, dispatches);
	}

	disconnectedCallback() {
		this._unsubscribeFromStore();
		super.disconnectedCallback();
	}
};
