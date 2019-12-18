import { RequesterMixin } from './instance-requester-mixin.js';

export const connect = (superclass) => class extends RequesterMixin(superclass) {

	connectedCallback() {
		super.connectedCallback();
		if (!this.store) {
			this.store = this.requestInstance(this.constructor.storeName);
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}
};
