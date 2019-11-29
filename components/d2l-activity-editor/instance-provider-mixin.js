export const ProviderMixin = superclass =>  class extends superclass {
	constructor() {
		super();
		this._instances = new Map();
		this.addEventListener('d2l-request-instance', this._handleRequest);
	}

	_handleRequest(e) {
		if (this._instances.has(e.detail.key)) {
			e.detail.instance = this._instances.get(e.detail.key);
			e.stopPropagation();
		}
	}

	provideInstance(key, instance) {
		this._instances.set(key, instance);
	}
}