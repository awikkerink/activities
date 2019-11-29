import { RequesterMixin } from './instance-requester-mixin.js';

export const connect = superclass => class extends RequesterMixin(superclass) {

	connectedCallback() {
		super.connectedCallback();
		const store = this.requestInstance('store');
		this._unsubscribeFromStore = store.subscribe(() => {
			const newProps = this.mapStateToProps(store.getState());
			if (this.props !== newProps) {
				this.props = newProps;
				this.requestUpdate();
			}
		})
	}

	disconnectedCallback() {
		this._unsubscribeFromStore();
		super.disconnectedCallback();
	}
}