import { css, html } from 'lit-element/lit-element.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin';

class ContentEditorLinkPreview extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			entity: { type: Object }
		};
	}

	static get styles() {
		return [
			super.styles,
			css`
				iframe {
					border: none;
					flex-grow: 1;
					height: 100%;
					min-height: 60vh;
					overflow: hidden;
					width: 100%;
				}
				.d2l-link-preview-iframe-container {
					/*
					if remaining height in content block is less than 60% of viewport height,
					iframe height should be 60% of viewport height,
					otherwise use all the remaining height
					*/
					display: flex;
					flex-direction: column;
					height: 100%;
					min-height: 60vh;
					overflow: hidden;
					resize: vertical;
				}
				.d2l-margined-container {
					margin-bottom: 18px;
				}
			`,
		];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		let preview = html``;
		if (this.entity) {
			const link = this.entity.link;

			preview = html`
				<iframe src=${link} @load=${this._onLoad} class='d2l-skeletize'></iframe>
			`;
		}

		return html`
		<div class='d2l-margined-container'>
			<div class='d2l-link-preview-iframe-container d2l-skeletize'>
				${preview}
			</div>
		</div>
		`;
	}

	_onLoad() {
		this.skeleton = false;
	}
}

customElements.define('d2l-activity-content-link-preview', ContentEditorLinkPreview);
