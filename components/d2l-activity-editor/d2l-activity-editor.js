import '@brightspace-ui/core/components/backdrop/backdrop.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { ActivityEditorTelemetryMixin } from './mixins/d2l-activity-editor-telemetry-mixin';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivityEditor extends ActivityEditorTelemetryMixin(ActivityEditorMixin(LocalizeActivityEditorMixin(LitElement))) {

	static get properties() {
		return {
			isSaving: { type: Boolean, attribute: 'is-saving' },
			_backdropShown: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-editor-loading {
				padding: 20px;
			}
		`;
	}

	constructor() {
		super();

		this.isSaving = false;
		this._backdropShown = false;
	}

	async validate() {
		const activity = store.get(this.href);
		if (activity) {
			await activity.validate();
		}
	}

	async save() {
		const activity = store.get(this.href);
		if (activity) {
			await activity.save();
		}
	}

	update(changedProperties) {
		super.update(changedProperties);
		// if (changedProperties.has('asyncState') && this.asyncState === asyncStates.complete) {
		// 	this.logLoadEvent(this.href, this.type, this.telemetryId);
		// }
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has('isSaving')) {
			this._toggleBackdrop(this.isSaving);
		}
	}

	_toggleBackdrop(show) {
		this._backdropShown = show;
	}

	hasPendingChanges() {
		const activity = store.get(this.href);
		if (activity) {
			return activity.dirty();
		}
		return false;
	}

	render() {
		return html`
			<div id="editor-container">
				<slot name="editor"></slot>
			</div>
			<d2l-backdrop
				for-target="editor-container"
				?shown="${this._backdropShown}"
				no-animate-hide
				delay-transition
				slow-transition>
			</d2l-backdrop>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
