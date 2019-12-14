export const ActivityEditorMixin = superclass => class extends superclass {

	static get properties() {
		return {
			/**
			 * Href for the entity
			 */
			href: {
				type: String,
				reflect: true
			},
			/**
			 * Token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
			 */
			token: { type: String },
			/**
			 * Entity object that extends the Entity class.
			 */
			_entity: { type: Object }
		};
	}

	constructor() {
		super();
		this._autoSave = true;
	}

	async save() {}

	_dispatchActivityEditorEvent(connected) {
		const event = new CustomEvent('d2l-activity-editor-connected', {
			detail: connected,
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
		if (event.defaultPrevented) {
			this._autoSave = false;
		}
	}

	connectedCallback() {
		super.connectedCallback();
		this._dispatchActivityEditorEvent(true);
	}

	disconnectedCallback() {
		this._dispatchActivityEditorEvent(false);
		super.disconnectedCallback();
	}
};
