import '@brightspace-ui/core/components/button/button-subtle.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityQuizDivider extends RtlMixin(LocalizeActivityEditorMixin(LitElement)) {

	static get styles() {
		return css`
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-divider {
				margin-left: -20px;
				width: calc(100% + 40px);
				height: 3rem;
				background-color: var(--d2l-color-regolith);
				border: 1px var(--d2l-color-mica);
				border-style: solid none;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			:host([dir="rtl"]) .d2l-activity-divider {
				margin-left: 0;
				margin-right: -20px;
			}
			.d2l-divider-container {
				width: inherit;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20px;
			}
		`;
	}

	render() {
		return html`
			<div class="d2l-activity-divider">
				<div class="d2l-divider-container">
					<slot name="header"></slot>
					<slot name="action"></slot>
				</div>
			</div>`;
	}
}

customElements.define(
	'd2l-activity-quiz-divider',
	ActivityQuizDivider
);
