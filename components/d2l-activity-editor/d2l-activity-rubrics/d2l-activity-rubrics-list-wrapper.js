import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from '../state/activity-store';

class ActivityRubricsListWrapper
	extends ActivityEditorMixin(MobxLitElement) {

	static get properties() {
		return {
			assignmentHref: { type: String }
		};
	}

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}
		return html`
		`;
	}
}

customElements.define(
	'd2l-activity-rubrics-list-wrapper',
	ActivityRubricsListWrapper
);
