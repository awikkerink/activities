import { RequesterMixin } from './instance-requester-mixin.js';

export const connect = (superclass) => class extends RequesterMixin(superclass) {

	connectedCallback() {
		super.connectedCallback();
		const store = this.requestInstance(this._storeName);
		store.addReducers(this._reducers);

		const update = (store) => {
			const newProps = this._mapStateToProps(store.getState());
			Object.assign(this, newProps);
		}

		this._unsubscribeFromStore = store.subscribe(() => {
			update(store);
		});

		update(store);

		const dispatches = this._mapDispatchToProps(store.dispatch);
		Object.assign(this, dispatches);
	}

	disconnectedCallback() {
		this._unsubscribeFromStore();
		super.disconnectedCallback();
	}
};
