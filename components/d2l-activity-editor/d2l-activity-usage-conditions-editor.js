import './d2l-activity-conditions-editor.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityUsageConditionsEditor extends ActivityEditorMixin(MobxLitElement) {

	static get properties() {

		return {
			description: { type: String }
		};
	}

	constructor() {

		super(store);

		this.r = false;
	}

	render() {
		const entity = store.get(this.href);
		if (!entity || !entity.conditionsHref) {
			return html``;
		}
		if (!this.r) {
			window.performance.measure('usageConditionsEditorEntity', this.localName);
			this.r = true;
		}

		return html`
			<d2l-activity-conditions-editor
				description="${this.description}"
				href="${entity.conditionsHref}"
				.token="${this.token}"
				?skeleton="${this.skeleton}">
			</d2l-activity-conditions-editor>
		`;
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);
		// window.performance.mark('conditionsRenderFirst')
	}

}

customElements.define(
	'd2l-activity-usage-conditions-editor',
	ActivityUsageConditionsEditor
);
