import '@brightspace-ui/core/components/colors/colors.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeActivityEditorMixin } from '../../../mixins/d2l-activity-editor-lang-mixin';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin';

class GblMapEditorSecondary extends AsyncContainerMixin(SkeletonMixin(RtlMixin(LocalizeActivityEditorMixin(LitElement)))) {
	static get properties() {
		return {
			activityUsageHref: { type: String, attribute: 'activity-usage-href' }
		};
	}

	static get styles() {
		return [
			super.styles,
			css`
				:host {
					background: var(--d2l-color-gypsum);
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > * {
					background: var(--d2l-color-white);
					border-radius: 8px;
					margin-bottom: 10px;
					padding: 20px;
					padding-top: 0;
				}
			`
		];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		return html``;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}
}

customElements.define('d2l-activity-gbl-map-editor-secondary', GblMapEditorSecondary);
