import { AsyncStateEvent } from '@brightspace-ui/core/helpers/asyncStateEvent.js';

export const ActivityEditorMixin = superclass => class extends superclass {

	static get properties() {
		return {
			/**
			 * Activity Type
			 */
			type: {
				type: String
			},
			/**
			 * Telemetry Id
			 */
			telemetryId: {
				type: String
			},
			/**
			 * Href for the component
			 */
			href: {
				type: String,
				reflect: true,
				converter: (value) => {
					return (value === 'undefined') ?  '' : value;
				}
			},
			/**
			 * Token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
			 */
			token: { type: String },
			/**
			 * Order in which the editor validation and saving occurs (lowest first)
			 */
			saveOrder: { attribute: 'save-order', reflect: true, type: Number },
			checkoutOnLoad: {
				type: Boolean
			},
			checkedOutHref: {
				type: String
			},
			/**
			 * Any pending promises before working-copy checkin can occur
			 */
			pendingUpdates: {
				type: Array
			}
		};
	}

	constructor(store) {
		super();
		this._container = null;
		this.store = store;
		this.saveOrder = 1000;
		this.pendingUpdates = [];
	}

	connectedCallback() {
		if (super.connectedCallback) {
			super.connectedCallback();
		}

		this._dispatchActivityEditorEvent();
	}
	disconnectedCallback() {
		if (this._container) {
			this._container.unregisterEditor(this);
		}

		if (super.disconnectedCallback) {
			super.disconnectedCallback();
		}
	}
	updated(changedProperties) {
		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {

			this.store && this._fetch(async() => {
				if (this.checkoutOnLoad) {
					const entity = await this.store.fetch(this.href, this.token);
					if (entity && entity.checkout) {
						this.checkedOutHref = await entity.checkout(this.store);
					}
				} else {
					return this.store.fetch(this.href, this.token);
				}
			});
		}
	}

	async cancelCreate() { }

	hasPendingChanges() {
		return false;
	}
	async save(createSelectboxGradeItemEnabled) {
		if (this.checkoutOnLoad) {
			const entity = this.store && this.store.get(this.checkedOutHref);
			if (!entity) return;

			// Refetch entity in case presence of the check in action has changed,
			// but make sure all updates have completed before refetching
			if (this.pendingUpdates) {
				await Promise.all(this.pendingUpdates);
			}
			await entity.fetch(true);

			await entity.checkin(this.store, true, createSelectboxGradeItemEnabled);
			this.pendingUpdates = [];
		}
	}

	async validate() {}

	_dispatchActivityEditorEvent() {
		const event = new CustomEvent('d2l-activity-editor-connected', {
			detail: { editor: this },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
		if (event.detail.container) {
			this._container = event.detail.container;
		}
	}

	async _fetch(fetcher) {
		const promise = fetcher();
		this._sendPendingEvent(promise);
		return promise;
	}

	_sendPendingEvent(promise) {
		const pendingEvent = new AsyncStateEvent(promise);
		this.dispatchEvent(pendingEvent);
	}

};
