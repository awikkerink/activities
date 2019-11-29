export const RequesterMixin = superclass =>  class extends superclass {
	requestInstance(key) {
		const event = new CustomEvent('d2l-request-instance', {
			detail: {key},
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
		return event.detail.instance;
	}
}