import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import '@brightspace-ui/core/components/colors/colors.js';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class LessonsFaceCreateEditor extends RtlMixin(LitElement) {

	static get properties() {
		return {
			/**
			* Set the WidthType on the template to constrain page width if necessary
			*/
			widthType: { type: String, attribute: 'width-type' }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			div[slot="secondary"] {
				height: 100%;
				background: var(--d2l-color-gypsum);
			}
			d2l-icon {
				padding-right: 1rem;
			}
			:host([dir="rtl"]) d2l-icon {
				padding-right: 0;
				padding-left: 1rem;
			}
		`;
	}

	get _editorTemplate() {

		return html`
			<d2l-template-primary-secondary width-type="${this.widthType}">
				<slot name="editor-nav" slot="header"></slot>
				<div slot="primary">
					<p>This is the primary slot</p>
				</div>
				<div slot="secondary">
					<p>This is the secondary slot</p>
				</div>
				<div slot="footer">
					<p>This is the footer slot</p>
				</div>
			</d2l-template-primary-secondary>
		`;
	}

	render() {
		return this._editorTemplate;
	}
}
customElements.define('d2l-activity-lessons-face-create-editor', LessonsFaceCreateEditor);
