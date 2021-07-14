import './d2l-activity-gbl-map-background-editor.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../../../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityEditorMixin } from '../../../mixins/d2l-activity-editor-lang-mixin';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin';

// TODO: DO I NEED THE ASYNC CONTAINER MIXIN?

class GblMapEditorSecondary extends AsyncContainerMixin(SkeletonMixin(RtlMixin(ActivityEditorMixin(LitElement)))) {
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
		return html`
			<d2l-activity-gbl-map-background-editor
				.href=${this.href}
				.token=${this.token}
				?skeleton=${this.skeleton}
			>
			</d2l-activity-gbl-map-background-editor>
		`;
	}
}

customElements.define('d2l-activity-gbl-map-editor-secondary', GblMapEditorSecondary);
