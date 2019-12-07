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
};
