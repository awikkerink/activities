export const SaveStatusMixin = superclass => class extends superclass {
	save(promise) {
		this.saveStart();

		return promise
			.then(this.saveEnd)
			.catch(err => this.saveError(err));
	}

	saveStart() {
		this.dispatchEvent(new CustomEvent('d2l-siren-entity-save-start', {
			bubbles: true,
			composed: true
		}));
	}

	saveEnd() {
		this.dispatchEvent(new CustomEvent('d2l-siren-entity-save-end', {
			bubbles: true,
			composed: true
		}));
	}

	saveError(error) {
		this.dispatchEvent(new CustomEvent('d2l-siren-entity-save-error', {
			error,
			bubbles: true,
			composed: true
		}));
	}
};
