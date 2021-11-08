import { css, html } from 'lit-element/lit-element.js';
import { heading4Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ExternalActivityContainer extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			skeleton: { type: Boolean },
			entityName: { type: String }
		};
	}

	static get styles() {
		return  [
			super.styles,
			labelStyles,
			heading4Styles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-external-activity-title-container {
					align-content: flex-start;
					align-items: center;
					background-color: var(--d2l-color-regolith);
					border: solid var(--d2l-color-mica);
					border-width: 1px 0;
					display: flex;
					height: 60px;
					justify-content: space-between;
					max-height: 60px;
					overflow: hidden;
					width: 104%;
				}
				.d2l-label-overflow {
					overflow: hidden;
					padding-left: 6px;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			`
		];
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		return html`
			<div class="d2l-external-activity-title-container d2l-skeletize-container">
				<label class="d2l-label-text d2l-heading-4 d2l-skeletize d2l-label-overflow">
					${this.localize('content.externalFile')}: ${this.entityName}
				</label>

				<slot name="action-button"></slot>
			</div>
		`;
	}
}

customElements.define('d2l-activity-content-external-activity-container', ExternalActivityContainer);
